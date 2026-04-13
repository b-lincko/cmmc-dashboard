#!/usr/bin/env python3
"""
Generate comprehensive CMMC controls with detailed implementation commands
for Windows, Linux, and macOS platforms.
"""

import json

CMMC_CONTROLS_DATA = [
    {
        "id": "AC.L2-3.1.1",
        "title": "Limit system access to authorized users",
        "domain": "AC",
        "difficulty": "Moderate",
        "category": "Active Directory",
        "description": "Only people who are supposed to use your computers and systems should be able to log in. Everyone needs their own username and password. No sharing accounts!",
        "prerequisites": ["Active Directory access with admin privileges", "PowerShell 5.0 or higher", "Access to domain controllers"],
        "tools": ["Active Directory Users and Computers (ADUC)", "PowerShell", "Group Policy Management Console (GPMC)"],
        "timeEstimate": "2-4 hours",
        "risks": ["Disabling wrong accounts could lock out legitimate users", "Shared accounts make it impossible to track who did what", "Inactive accounts can become security vulnerabilities"],
        "bestPractices": ["Use individual accounts for each user", "Implement account lockout policies", "Review accounts quarterly", "Document account creation and deletion", "Use strong naming conventions for service accounts"],
        "references": ["NIST 800-171 AC-2: Account Management", "Microsoft: Active Directory Best Practices", "CIS Controls: Access Control"],
        "verification": ["Run 'Get-ADUser -Filter * -Properties Enabled' and verify all users are legitimate", "Check Event Viewer > Windows Logs > Security for failed login attempts", "Verify no shared accounts exist by searching for accounts with multiple users", "Confirm disabled accounts are truly disabled", "Run 'net user' command and verify only authorized accounts are present"],
        "windowsCommands": {
            "powershell": [
                "# List all user accounts in Active Directory",
                "Get-ADUser -Filter * -Properties Name, SamAccountName, Enabled, LastLogonDate | Select-Object Name, SamAccountName, Enabled, LastLogonDate | Export-Csv -Path C:\\Temp\\ADUsers.csv -NoTypeInformation",
                "",
                "# Find disabled accounts",
                "Get-ADUser -Filter 'Enabled -eq $false' -Properties Name, DisabledDate | Select-Object Name, DisabledDate",
                "",
                "# Find accounts not logged in for 90 days",
                "$90DaysAgo = (Get-Date).AddDays(-90)",
                "Get-ADUser -Filter 'LastLogonDate -lt $90DaysAgo' -Properties Name, LastLogonDate | Select-Object Name, LastLogonDate",
                "",
                "# Disable a user account",
                "Disable-ADAccount -Identity 'username'",
                "",
                "# Find shared accounts",
                "Get-ADUser -Filter * -Properties Name, Description | Where-Object {$_.Description -like '*shared*' -or $_.Name -like '*shared*'}"
            ],
            "groupPolicy": [
                "1. Open Group Policy Management Console (gpmc.msc)",
                "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > User Rights Assignment",
                "3. Configure 'Allow log on locally' - specify authorized users only",
                "4. Configure 'Deny log on locally' - add unauthorized users",
                "5. Apply policy to all domain computers",
                "6. Run 'gpupdate /force' on client machines"
            ],
            "registry": [
                "# Prevent shared accounts",
                "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'RestrictAnonymous' /t REG_DWORD /d 2 /f",
                "",
                "# Audit account logon events",
                "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'AuditBaseObjects' /t REG_DWORD /d 1 /f"
            ]
        },
        "linuxCommands": [
            "# List all user accounts",
            "cat /etc/passwd | cut -d: -f1,3,6",
            "",
            "# List only human users (UID >= 1000)",
            "awk -F: '$3 >= 1000 {print $1, $3, $6}' /etc/passwd",
            "",
            "# Find accounts with no password set",
            "awk -F: '($2 == \"\" || $2 == \"!\") {print $1}' /etc/shadow",
            "",
            "# Disable a user account",
            "usermod -L username",
            "",
            "# Lock account after inactivity (set to 90 days)",
            "useradd -f 90 username",
            "",
            "# Check last login",
            "lastlog | grep username",
            "",
            "# Remove user account",
            "userdel -r username"
        ],
        "macCommands": [
            "# List all user accounts",
            "dscl . list /Users | grep -v '^_'",
            "",
            "# Get user details",
            "dscl . read /Users/username",
            "",
            "# Disable user account",
            "dscl . create /Users/username UserShell /usr/bin/false",
            "",
            "# Check last login",
            "log show --predicate 'eventMessage contains[cd] \"session started\"' --last 1h"
        ]
    },
    {
        "id": "AC.L2-3.1.2",
        "title": "Limit system access to processes acting on behalf of authorized users",
        "domain": "AC",
        "difficulty": "Hard",
        "category": "Active Directory",
        "description": "Control which applications and services can act on behalf of users to prevent unauthorized access.",
        "prerequisites": ["Active Directory access", "PowerShell 5.0 or higher", "Service account management experience"],
        "tools": ["PowerShell", "Active Directory", "Group Policy", "Windows Event Viewer"],
        "timeEstimate": "4-6 hours",
        "risks": ["Service accounts with excessive privileges can be exploited", "Unmonitored service accounts can hide unauthorized access", "Service account compromise can lead to lateral movement"],
        "bestPractices": ["Use dedicated service accounts for each service", "Implement least privilege principle", "Rotate service account passwords regularly", "Monitor service account activities", "Document all service accounts and their purposes"],
        "references": ["NIST 800-171 AC-3: Access Enforcement", "Microsoft: Service Account Best Practices", "CIS: Service Account Management"],
        "verification": ["Verify service accounts are not in Administrators group", "Check Event Viewer for service account logons", "Confirm services run with minimal required privileges", "Audit 'Log on as a service' rights assignment", "Review and document all service accounts and their purposes"],
        "windowsCommands": {
            "powershell": [
                "# List all service accounts",
                "Get-ADUser -Filter 'Name -like \"*svc*\" -or Name -like \"*service*\"' -Properties Name, SamAccountName, Enabled",
                "",
                "# Get services running under specific account",
                "Get-WmiObject Win32_Service -Filter \"StartName='DOMAIN\\\\ServiceAccount'\" | Select-Object Name, DisplayName, StartName",
                "",
                "# Set service to run under specific account",
                "$ServiceName = 'ServiceName'",
                "$UserName = 'DOMAIN\\\\ServiceAccount'",
                "$Password = Read-Host -AsSecureString 'Enter password'",
                "Set-Service -Name $ServiceName -Credential (New-Object System.Management.Automation.PSCredential($UserName, $Password))",
                "",
                "# Remove unnecessary service account permissions",
                "Remove-ADGroupMember -Identity 'Administrators' -Members 'ServiceAccount' -Confirm:$false",
                "",
                "# Audit service account logons",
                "Get-EventLog -LogName Security -InstanceId 4624 | Where-Object {$_.Message -like '*ServiceAccount*'} | Select-Object TimeGenerated, Message"
            ],
            "groupPolicy": [
                "1. Open Group Policy Management Console",
                "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > User Rights Assignment",
                "3. Configure 'Log on as a service' - add only necessary service accounts",
                "4. Configure 'Log on as a batch job' - restrict to needed accounts",
                "5. Remove service accounts from Administrators group",
                "6. Apply principle of least privilege"
            ],
            "registry": [
                "# Audit service account activities",
                "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'AuditBaseObjects' /t REG_DWORD /d 1 /f",
                "",
                "# Enable service account logon auditing",
                "auditpol /set /subcategory:'Logon/Logoff' /success:enable /failure:enable"
            ]
        },
        "linuxCommands": [
            "# List service accounts",
            "awk -F: '$3 < 1000 {print $1, $3}' /etc/passwd",
            "",
            "# Check sudo privileges for service accounts",
            "sudo -l -U serviceaccount",
            "",
            "# Configure sudo for service account (least privilege)",
            "visudo",
            "# Add: serviceaccount ALL=(root) NOPASSWD: /usr/bin/specific-command",
            "",
            "# Monitor service account usage",
            "sudo journalctl -u servicename -f",
            "",
            "# Check running processes by service account",
            "ps aux | grep serviceaccount"
        ],
        "macCommands": [
            "# List service accounts",
            "dscl . list /Users | grep -E 'svc|service'",
            "",
            "# Check sudo access",
            "sudo dscl . read /Users/serviceaccount",
            "",
            "# Monitor service activities",
            "log stream --predicate 'process == \"serviceprocess\"'"
        ]
    },
    {
        "id": "AC.L2-3.1.6",
        "title": "Use non-privileged accounts when accessing non-security functions",
        "domain": "AC",
        "difficulty": "Easy",
        "category": "Active Directory",
        "description": "Don't use admin accounts for everyday tasks. Use regular user accounts and elevate only when needed.",
        "prerequisites": ["Active Directory access", "PowerShell 3.0 or higher", "Group Policy access"],
        "tools": ["Active Directory Users and Computers", "PowerShell", "Group Policy Management"],
        "timeEstimate": "1-2 hours",
        "risks": ["Users may bypass UAC if not properly trained", "Admin account compromise affects entire system", "Shared admin accounts prevent accountability"],
        "bestPractices": ["Use separate accounts for admin and regular tasks", "Enable UAC on all systems", "Never use admin account for daily work", "Train users on account separation", "Monitor admin account usage"],
        "references": ["NIST 800-171 AC-2: Account Management", "Microsoft: User Account Control Best Practices", "CIS: Privilege Management"],
        "verification": ["Verify standard users cannot run admin commands without elevation", "Confirm UAC prompts appear when attempting admin tasks", "Check Event Viewer for admin account logons", "Verify separate admin accounts exist for privileged users", "Test that standard user accounts work for daily tasks"],
        "windowsCommands": {
            "powershell": [
                "# Create a standard user account",
                "New-ADUser -Name 'John Doe' -SamAccountName 'jdoe' -UserPrincipalName 'jdoe@domain.com' -Path 'OU=Users,DC=domain,DC=com' -AccountPassword (ConvertTo-SecureString 'P@ssw0rd123!' -AsPlain -Force) -Enabled $true",
                "",
                "# Create a separate admin account for the same user",
                "New-ADUser -Name 'John Doe Admin' -SamAccountName 'jdoe-admin' -UserPrincipalName 'jdoe-admin@domain.com' -Path 'OU=Admin,DC=domain,DC=com' -AccountPassword (ConvertTo-SecureString 'P@ssw0rd123!' -AsPlain -Force) -Enabled $true",
                "",
                "# Add user to Administrators group",
                "Add-ADGroupMember -Identity 'Administrators' -Members 'jdoe-admin'",
                "",
                "# Monitor admin account usage",
                "Get-EventLog -LogName Security -InstanceId 4624 | Where-Object {$_.Message -like '*Administrators*'} | Select-Object TimeGenerated, Message",
                "",
                "# Check who has admin rights",
                "Get-ADGroupMember -Identity 'Administrators' | Select-Object Name, SamAccountName"
            ],
            "groupPolicy": [
                "1. Open Group Policy Management Console",
                "2. Create new GPO: 'UAC Settings'",
                "3. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > Security Options",
                "4. Configure 'User Account Control: Run all administrators in Admin Approval Mode' = Enabled",
                "5. Configure 'User Account Control: Prompt for credentials on the secure desktop' = Enabled",
                "6. Link GPO to all workstations",
                "7. Run 'gpupdate /force' on client machines"
            ],
            "registry": [
                "# Enable UAC",
                "reg add 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v 'EnableLUA' /t REG_DWORD /d 1 /f",
                "",
                "# Require credentials for admin tasks",
                "reg add 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v 'ConsentPromptBehaviorAdmin' /t REG_DWORD /d 1 /f",
                "",
                "# Audit admin account usage",
                "auditpol /set /subcategory:'Logon/Logoff' /success:enable /failure:enable"
            ]
        },
        "linuxCommands": [
            "# Create standard user account",
            "sudo useradd -m -s /bin/bash jdoe",
            "",
            "# Set password",
            "sudo passwd jdoe",
            "",
            "# Create separate admin account",
            "sudo useradd -m -s /bin/bash jdoe-admin",
            "",
            "# Add to sudoers with specific commands only",
            "echo 'jdoe-admin ALL=(ALL) /usr/bin/systemctl restart apache2' | sudo tee -a /etc/sudoers.d/jdoe-admin",
            "",
            "# Monitor sudo usage",
            "sudo grep 'sudo' /var/log/auth.log",
            "",
            "# Check current admin users",
            "getent group sudo"
        ],
        "macCommands": [
            "# Create standard user",
            "sudo dscl . -create /Users/jdoe UserShell /bin/bash",
            "",
            "# Create admin account",
            "sudo dscl . -create /Users/jdoe-admin UserShell /bin/bash",
            "",
            "# Add to admin group",
            "sudo dscl . -append /Groups/admin GroupMembership jdoe-admin",
            "",
            "# Monitor sudo usage",
            "log stream --predicate 'eventMessage contains[cd] \"sudo\"'"
        ]
    }
]

def generate_typescript_file():
    """Generate TypeScript file with all CMMC controls."""
    
    ts_content = """export interface CMMCControlEnhanced {
  id: string;
  title: string;
  domain: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  category: "Active Directory" | "Network" | "Physical" | "Mobile" | "Policy";
  description: string;
  steps: string[];
  completed: boolean;
  prerequisites: string[];
  tools: string[];
  windowsCommands: {
    powershell: string[];
    groupPolicy: string[];
    registry: string[];
  };
  linuxCommands: string[];
  macCommands: string[];
  verification: string[];
  timeEstimate: string;
  references: string[];
  risks: string[];
  bestPractices: string[];
}

export const CMMC_CONTROLS_ENHANCED: CMMCControlEnhanced[] = [\n"""
    
    for control in CMMC_CONTROLS_DATA:
        ts_content += f"""  {{
    id: "{control['id']}",
    title: "{control['title']}",
    domain: "{control['domain']}",
    difficulty: "{control['difficulty']}",
    category: "{control['category']}",
    description: "{control['description']}",
    steps: [],
    completed: false,
    prerequisites: {json.dumps(control['prerequisites'])},
    tools: {json.dumps(control['tools'])},
    windowsCommands: {{
      powershell: {json.dumps(control['windowsCommands']['powershell'])},
      groupPolicy: {json.dumps(control['windowsCommands']['groupPolicy'])},
      registry: {json.dumps(control['windowsCommands']['registry'])}
    }},
    linuxCommands: {json.dumps(control['linuxCommands'])},
    macCommands: {json.dumps(control['macCommands'])},
    verification: {json.dumps(control['verification'])},
    timeEstimate: "{control['timeEstimate']}",
    references: {json.dumps(control['references'])},
    risks: {json.dumps(control['risks'])},
    bestPractices: {json.dumps(control['bestPractices'])}
  }},\n"""
    
    ts_content += "];"
    
    return ts_content

if __name__ == "__main__":
    output = generate_typescript_file()
    print(output[:2000])  # Print first 2000 chars
    print("\n... (file continues) ...\n")
    print(f"Total lines: {len(output.split(chr(10)))}")
