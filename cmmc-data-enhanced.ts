export interface CMMCControlEnhanced {
  id: string;
  title: string;
  domain: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  category: "Active Directory" | "Network" | "Physical" | "Mobile" | "Policy";
  description: string;
  steps: string[];
  completed: boolean;
  // New enhanced fields
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

export const CMMC_CONTROLS_ENHANCED: CMMCControlEnhanced[] = [
  {
    id: "AC.L2-3.1.1",
    title: "Limit system access to authorized users",
    domain: "AC",
    difficulty: "Moderate",
    category: "Active Directory",
    description: "Only people who are supposed to use your computers and systems should be able to log in. Everyone needs their own username and password. No sharing accounts!",
    steps: [
      "Review all user accounts in Active Directory",
      "Disable accounts for people who left",
      "Ensure no shared/generic accounts exist",
      "Export user account list for documentation"
    ],
    completed: false,
    prerequisites: [
      "Active Directory access with admin privileges",
      "PowerShell 5.0 or higher",
      "Access to domain controllers"
    ],
    tools: [
      "Active Directory Users and Computers (ADUC)",
      "PowerShell",
      "Group Policy Management Console (GPMC)"
    ],
    windowsCommands: {
      powershell: [
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
        "# Find shared accounts (accounts with multiple users)",
        "Get-ADUser -Filter * -Properties Name, Description | Where-Object {$_.Description -like '*shared*' -or $_.Name -like '*shared*'}"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console (gpmc.msc)",
        "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > User Rights Assignment",
        "3. Configure 'Allow log on locally' - specify authorized users only",
        "4. Configure 'Deny log on locally' - add unauthorized users",
        "5. Apply policy to all domain computers",
        "6. Run 'gpupdate /force' on client machines"
      ],
      registry: [
        "# Prevent shared accounts (via registry)",
        "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'RestrictAnonymous' /t REG_DWORD /d 2 /f",
        "",
        "# Audit account logon events",
        "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'AuditBaseObjects' /t REG_DWORD /d 1 /f"
      ]
    },
    linuxCommands: [
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
    macCommands: [
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
    ],
    verification: [
      "Run 'Get-ADUser -Filter * -Properties Enabled' and verify all users are legitimate",
      "Check Event Viewer > Windows Logs > Security for failed login attempts",
      "Verify no shared accounts exist by searching for accounts with multiple users",
      "Confirm disabled accounts are truly disabled: 'Get-ADUser -Filter \"Enabled -eq $false\"'",
      "Run 'net user' command and verify only authorized accounts are present"
    ],
    timeEstimate: "2-4 hours",
    references: [
      "NIST 800-171 AC-2: Account Management",
      "Microsoft: Active Directory Best Practices",
      "CIS Controls: Access Control"
    ],
    risks: [
      "Disabling wrong accounts could lock out legitimate users",
      "Shared accounts make it impossible to track who did what",
      "Inactive accounts can become security vulnerabilities"
    ],
    bestPractices: [
      "Use individual accounts for each user",
      "Implement account lockout policies",
      "Review accounts quarterly",
      "Document account creation and deletion",
      "Use strong naming conventions for service accounts"
    ]
  },
  {
    id: "AC.L2-3.1.2",
    title: "Limit system access to processes acting on behalf of authorized users",
    domain: "AC",
    difficulty: "Hard",
    category: "Active Directory",
    description: "Control which applications and services can act on behalf of users to prevent unauthorized access.",
    steps: [
      "Review service accounts",
      "Configure service account permissions",
      "Implement least privilege for services",
      "Monitor service account usage"
    ],
    completed: false,
    prerequisites: [
      "Active Directory access",
      "PowerShell 5.0 or higher",
      "Service account management experience"
    ],
    tools: [
      "PowerShell",
      "Active Directory",
      "Group Policy",
      "Windows Event Viewer"
    ],
    windowsCommands: {
      powershell: [
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
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > User Rights Assignment",
        "3. Configure 'Log on as a service' - add only necessary service accounts",
        "4. Configure 'Log on as a batch job' - restrict to needed accounts",
        "5. Remove service accounts from Administrators group",
        "6. Apply principle of least privilege"
      ],
      registry: [
        "# Audit service account activities",
        "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'AuditBaseObjects' /t REG_DWORD /d 1 /f",
        "",
        "# Enable service account logon auditing",
        "auditpol /set /subcategory:'Logon/Logoff' /success:enable /failure:enable"
      ]
    },
    linuxCommands: [
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
    macCommands: [
      "# List service accounts",
      "dscl . list /Users | grep -E 'svc|service'",
      "",
      "# Check sudo access",
      "sudo dscl . read /Users/serviceaccount",
      "",
      "# Monitor service activities",
      "log stream --predicate 'process == \"serviceprocess\"'"
    ],
    verification: [
      "Verify service accounts are not in Administrators group",
      "Check Event Viewer for service account logons",
      "Confirm services run with minimal required privileges",
      "Audit 'Log on as a service' rights assignment",
      "Review and document all service accounts and their purposes"
    ],
    timeEstimate: "4-6 hours",
    references: [
      "NIST 800-171 AC-3: Access Enforcement",
      "Microsoft: Service Account Best Practices",
      "CIS: Service Account Management"
    ],
    risks: [
      "Service accounts with excessive privileges can be exploited",
      "Unmonitored service accounts can hide unauthorized access",
      "Service account compromise can lead to lateral movement"
    ],
    bestPractices: [
      "Use dedicated service accounts for each service",
      "Implement least privilege principle",
      "Rotate service account passwords regularly",
      "Monitor service account activities",
      "Document all service accounts and their purposes"
    ]
  },
  {
    id: "AC.L2-3.1.6",
    title: "Use non-privileged accounts when accessing non-security functions",
    domain: "AC",
    difficulty: "Easy",
    category: "Active Directory",
    description: "Don't use admin accounts for everyday tasks. Use regular user accounts and elevate only when needed.",
    steps: [
      "Create standard user accounts",
      "Train users on account separation",
      "Configure UAC prompts",
      "Monitor admin account usage"
    ],
    completed: false,
    prerequisites: [
      "Active Directory access",
      "PowerShell 3.0 or higher",
      "Group Policy access"
    ],
    tools: [
      "Active Directory Users and Computers",
      "PowerShell",
      "Group Policy Management"
    ],
    windowsCommands: {
      powershell: [
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
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Create new GPO: 'UAC Settings'",
        "3. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > Security Options",
        "4. Configure 'User Account Control: Run all administrators in Admin Approval Mode' = Enabled",
        "5. Configure 'User Account Control: Prompt for credentials on the secure desktop' = Enabled",
        "6. Link GPO to all workstations",
        "7. Run 'gpupdate /force' on client machines"
      ],
      registry: [
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
    linuxCommands: [
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
    macCommands: [
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
    ],
    verification: [
      "Verify standard users cannot run admin commands without elevation",
      "Confirm UAC prompts appear when attempting admin tasks",
      "Check Event Viewer for admin account logons",
      "Verify separate admin accounts exist for privileged users",
      "Test that standard user accounts work for daily tasks"
    ],
    timeEstimate: "1-2 hours",
    references: [
      "NIST 800-171 AC-2: Account Management",
      "Microsoft: User Account Control Best Practices",
      "CIS: Privilege Management"
    ],
    risks: [
      "Users may bypass UAC if not properly trained",
      "Admin account compromise affects entire system",
      "Shared admin accounts prevent accountability"
    ],
    bestPractices: [
      "Use separate accounts for admin and regular tasks",
      "Enable UAC on all systems",
      "Never use admin account for daily work",
      "Train users on account separation",
      "Monitor admin account usage"
    ]
  },
  {
    id: "AC.L2-3.1.7",
    title: "Prevent non-privileged users from executing privileged functions",
    domain: "AC",
    difficulty: "Easy",
    category: "Active Directory",
    description: "Regular users should not be able to run administrative commands or install software.",
    steps: [
      "Configure User Access Control",
      "Restrict local admin rights",
      "Use Group Policy for restrictions",
      "Test and validate"
    ],
    completed: false,
    prerequisites: [
      "Local admin access",
      "Group Policy access",
      "PowerShell 3.0 or higher"
    ],
    tools: [
      "Group Policy Management",
      "PowerShell",
      "Local Security Policy"
    ],
    windowsCommands: {
      powershell: [
        "# Remove user from local Administrators group",
        "Remove-LocalGroupMember -Group 'Administrators' -Member 'DOMAIN\\\\Username' -Confirm:$false",
        "",
        "# Verify user is not admin",
        "Get-LocalGroupMember -Group 'Administrators'",
        "",
        "# Prevent software installation for non-admins",
        "New-ItemProperty -Path 'HKCU:\\Software\\Policies\\Microsoft\\Windows\\Installer' -Name 'DisableMSI' -Value 2 -PropertyType DWORD -Force",
        "",
        "# Audit privilege use",
        "Get-EventLog -LogName Security -InstanceId 4673 | Select-Object TimeGenerated, Message | Sort-Object TimeGenerated -Descending | Select-Object -First 10"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Create new GPO: 'Restrict Privileges'",
        "3. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > User Rights Assignment",
        "4. Set 'Add workstations to domain' = Administrators only",
        "5. Set 'Load and unload device drivers' = Administrators only",
        "6. Set 'Shut down the system' = Administrators, Users",
        "7. Navigate to: Computer Configuration > Policies > Administrative Templates > System > Installer",
        "8. Set 'Always install with elevated privileges' = Disabled",
        "9. Link GPO to all workstations"
      ],
      registry: [
        "# Prevent software installation",
        "reg add 'HKCU\\Software\\Policies\\Microsoft\\Windows\\Installer' /v 'DisableMSI' /t REG_DWORD /d 2 /f",
        "",
        "# Disable device driver installation",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\PlugPlay' /v 'Start' /t REG_DWORD /d 3 /f",
        "",
        "# Enable privilege use auditing",
        "auditpol /set /subcategory:'Privilege Use' /success:enable /failure:enable"
      ]
    },
    linuxCommands: [
      "# Remove user from sudo group",
      "sudo delgroup username sudo",
      "",
      "# Prevent sudo access entirely",
      "sudo usermod -G '' username",
      "",
      "# Verify user cannot use sudo",
      "sudo -l -U username",
      "",
      "# Restrict package installation",
      "sudo visudo",
      "# Comment out: %sudo ALL=(ALL:ALL) ALL",
      "",
      "# Monitor privilege escalation attempts",
      "sudo grep 'sudo' /var/log/auth.log | grep 'COMMAND'"
    ],
    macCommands: [
      "# Remove user from admin group",
      "sudo dscl . -delete /Groups/admin GroupMembership username",
      "",
      "# Verify user is not admin",
      "dscl . read /Groups/admin GroupMembership",
      "",
      "# Restrict sudo access",
      "sudo visudo",
      "# Remove user from sudoers file"
    ],
    verification: [
      "Attempt to install software as regular user - should fail",
      "Try to access Device Manager as regular user - should be denied",
      "Verify UAC prompt appears for admin tasks",
      "Check Event Viewer for privilege escalation attempts",
      "Confirm regular users cannot modify system settings"
    ],
    timeEstimate: "1-2 hours",
    references: [
      "NIST 800-171 AC-3: Access Enforcement",
      "Microsoft: User Account Control",
      "CIS: Privilege Management"
    ],
    risks: [
      "Users may find workarounds if not properly configured",
      "Legitimate admin tasks may be blocked",
      "Overly restrictive policies may impact productivity"
    ],
    bestPractices: [
      "Use Group Policy for consistent enforcement",
      "Test policies before wide deployment",
      "Document exceptions and approvals",
      "Monitor for privilege escalation attempts",
      "Educate users on security policies"
    ]
  },
  {
    id: "AC.L2-3.1.8",
    title: "Limit unsuccessful logon attempts",
    domain: "AC",
    difficulty: "Easy",
    category: "Active Directory",
    description: "Lock accounts after too many failed login attempts to prevent brute force attacks.",
    steps: [
      "Configure lockout policy",
      "Set threshold and duration",
      "Monitor lockout events",
      "Document policy"
    ],
    completed: false,
    prerequisites: [
      "Active Directory access",
      "Domain admin rights",
      "PowerShell access"
    ],
    tools: [
      "Active Directory",
      "Group Policy Management",
      "PowerShell"
    ],
    windowsCommands: {
      powershell: [
        "# Get current account lockout policy",
        "Get-ADDefaultDomainPasswordPolicy",
        "",
        "# Set account lockout policy",
        "Set-ADDefaultDomainPasswordPolicy -LockoutDuration 00:30:00 -LockoutObservationWindow 00:30:00 -LockoutThreshold 5",
        "",
        "# Unlock a locked account",
        "Unlock-ADAccount -Identity 'username'",
        "",
        "# Find locked accounts",
        "Search-ADAccount -LockedOut | Select-Object Name, SamAccountName",
        "",
        "# Monitor failed logon attempts",
        "Get-EventLog -LogName Security -InstanceId 4625 | Select-Object TimeGenerated, Message | Sort-Object TimeGenerated -Descending | Select-Object -First 20",
        "",
        "# Get account lockout status",
        "Get-ADUser -Identity 'username' -Properties LockedOut, LastBadPasswordAttempt | Select-Object Name, LockedOut, LastBadPasswordAttempt"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Account Policies > Account Lockout Policy",
        "3. Set 'Account lockout duration' = 30 minutes",
        "4. Set 'Account lockout threshold' = 5 invalid logon attempts",
        "5. Set 'Reset account lockout counter after' = 30 minutes",
        "6. Apply policy to all domain computers",
        "7. Run 'gpupdate /force' on client machines"
      ],
      registry: [
        "# Configure account lockout via registry",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\Netlogon\\Parameters' /v 'LockoutDuration' /t REG_DWORD /d 30 /f",
        "",
        "# Set lockout threshold",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\Netlogon\\Parameters' /v 'LockoutThreshold' /t REG_DWORD /d 5 /f",
        "",
        "# Enable failed logon auditing",
        "auditpol /set /subcategory:'Logon/Logoff' /failure:enable"
      ]
    },
    linuxCommands: [
      "# Install pam_tally2 for account lockout",
      "sudo apt-get install libpam-cracklib",
      "",
      "# Configure /etc/pam.d/common-auth",
      "sudo nano /etc/pam.d/common-auth",
      "# Add: auth required pam_tally2.so onerr=fail audit silent deny=5 unlock_time=1800",
      "",
      "# Check failed login attempts",
      "sudo pam_tally2 -u username",
      "",
      "# Unlock account",
      "sudo pam_tally2 -u username -r",
      "",
      "# Monitor failed logins",
      "sudo grep 'Failed password' /var/log/auth.log"
    ],
    macCommands: [
      "# Configure account lockout on macOS",
      "sudo defaults write /Library/Preferences/com.apple.loginwindow MaxFailedAttempts -int 5",
      "",
      "# Set lockout duration (in seconds)",
      "sudo defaults write /Library/Preferences/com.apple.loginwindow LockoutDuration -int 1800",
      "",
      "# Monitor failed login attempts",
      "log stream --predicate 'eventMessage contains[cd] \"failed\"' --level debug"
    ],
    verification: [
      "Test by entering wrong password 5 times - account should lock",
      "Verify locked account cannot login",
      "Confirm account unlocks after 30 minutes",
      "Check Event Viewer for failed logon events (ID 4625)",
      "Verify administrators can unlock accounts"
    ],
    timeEstimate: "1-2 hours",
    references: [
      "NIST 800-171 AC-7: Unsuccessful Logon Attempts",
      "Microsoft: Account Lockout Policy",
      "CIS: Authentication"
    ],
    risks: [
      "Legitimate users may get locked out",
      "Attackers may use lockout for denial of service",
      "Overly aggressive lockout may impact usability"
    ],
    bestPractices: [
      "Set threshold to 5-10 attempts",
      "Set lockout duration to 15-30 minutes",
      "Monitor lockout events regularly",
      "Document and communicate policy to users",
      "Provide self-service unlock if possible"
    ]
  },
  {
    id: "IA.L2-3.5.1",
    title: "Identify system users, processes acting on behalf of users, and devices",
    domain: "IA",
    difficulty: "Moderate",
    category: "Active Directory",
    description: "Maintain a complete inventory of all users, service accounts, and devices accessing your systems.",
    steps: [
      "Create user inventory",
      "Document service accounts",
      "Maintain device inventory",
      "Update regularly"
    ],
    completed: false,
    prerequisites: [
      "Active Directory access",
      "PowerShell 3.0 or higher",
      "Network access"
    ],
    tools: [
      "Active Directory",
      "PowerShell",
      "SCCM or Intune"
    ],
    windowsCommands: {
      powershell: [
        "# Export all users to CSV",
        "Get-ADUser -Filter * -Properties Name, SamAccountName, Enabled, LastLogonDate, Description | Export-Csv -Path C:\\Temp\\AllUsers.csv -NoTypeInformation",
        "",
        "# Export all computers",
        "Get-ADComputer -Filter * -Properties Name, OperatingSystem, LastLogonDate | Export-Csv -Path C:\\Temp\\AllComputers.csv -NoTypeInformation",
        "",
        "# Export all service accounts",
        "Get-ADUser -Filter 'Name -like \"*svc*\" -or Name -like \"*service*\"' -Properties Name, SamAccountName, Description | Export-Csv -Path C:\\Temp\\ServiceAccounts.csv -NoTypeInformation",
        "",
        "# Get all devices on network",
        "Get-ADComputer -Filter * -Properties Name, IPv4Address, OperatingSystem | Select-Object Name, OperatingSystem",
        "",
        "# Export current logon sessions",
        "Get-ADUser -Filter * -Properties Name, LastLogonDate | Sort-Object LastLogonDate -Descending | Export-Csv -Path C:\\Temp\\UserLogons.csv -NoTypeInformation"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Audit Policy",
        "3. Enable 'Audit account logon events'",
        "4. Enable 'Audit logon events'",
        "5. Enable 'Audit object access'",
        "6. Apply to all computers",
        "7. Review logs regularly"
      ],
      registry: [
        "# Enable detailed logging",
        "reg add 'HKLM\\System\\CurrentControlSet\\Control\\Lsa' /v 'AuditBaseObjects' /t REG_DWORD /d 1 /f",
        "",
        "# Enable process tracking",
        "auditpol /set /subcategory:'Process Creation' /success:enable"
      ]
    },
    linuxCommands: [
      "# List all users",
      "awk -F: '{print $1, $3, $6}' /etc/passwd",
      "",
      "# List all logged-in users",
      "who",
      "",
      "# List all processes",
      "ps aux",
      "",
      "# Export user list",
      "awk -F: '{print $1, $3, $6}' /etc/passwd > /tmp/users.txt",
      "",
      "# Check network connections",
      "netstat -tulpn",
      "",
      "# Monitor user logins",
      "tail -f /var/log/auth.log"
    ],
    macCommands: [
      "# List all users",
      "dscl . list /Users",
      "",
      "# Get user details",
      "dscl . read /Users/username",
      "",
      "# List logged-in users",
      "who",
      "",
      "# Monitor system processes",
      "ps aux | head -20"
    ],
    verification: [
      "Verify all users in inventory are legitimate",
      "Confirm all service accounts are documented",
      "Check that all devices are accounted for",
      "Verify inventory is updated at least quarterly",
      "Ensure no unauthorized accounts exist"
    ],
    timeEstimate: "2-3 hours",
    references: [
      "NIST 800-171 IA-2: Authentication",
      "CIS: Identity and Access Management",
      "Microsoft: User and Device Management"
    ],
    risks: [
      "Unauthorized users may go undetected",
      "Stale inventory may miss security issues",
      "Service accounts may be forgotten"
    ],
    bestPractices: [
      "Maintain current inventory",
      "Review quarterly",
      "Document all accounts",
      "Track creation and deletion dates",
      "Audit access regularly"
    ]
  },
  {
    id: "IA.L2-3.5.2",
    title: "Authenticate users and processes to establish trusted identities",
    domain: "IA",
    difficulty: "Moderate",
    category: "Active Directory",
    description: "Implement strong authentication mechanisms to verify user and process identities.",
    steps: [
      "Implement strong passwords",
      "Enable MFA",
      "Configure certificate-based auth",
      "Monitor authentication"
    ],
    completed: false,
    prerequisites: [
      "Active Directory",
      "MFA solution",
      "PKI infrastructure"
    ],
    tools: [
      "Active Directory",
      "Azure MFA",
      "Certificates",
      "RADIUS"
    ],
    windowsCommands: {
      powershell: [
        "# Set password policy",
        "Set-ADDefaultDomainPasswordPolicy -MinPasswordLength 14 -MaxPasswordAge 90 -MinPasswordAge 1 -PasswordHistoryCount 24 -ComplexityEnabled $true",
        "",
        "# Require password change at next logon",
        "Set-ADUser -Identity 'username' -ChangePasswordAtLogon $true",
        "",
        "# Force password reset",
        "Set-ADAccountPassword -Identity 'username' -Reset -NewPassword (ConvertTo-SecureString -AsPlainText 'TempPassword123!' -Force)",
        "",
        "# Enable smart card logon",
        "Set-ADUser -Identity 'username' -SmartcardLogonRequired $true",
        "",
        "# Check password expiration",
        "Get-ADUser -Identity 'username' -Properties PasswordLastSet | Select-Object Name, PasswordLastSet"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Account Policies > Password Policy",
        "3. Set 'Minimum password length' = 14 characters",
        "4. Set 'Password must meet complexity requirements' = Enabled",
        "5. Set 'Maximum password age' = 90 days",
        "6. Set 'Minimum password age' = 1 day",
        "7. Set 'Enforce password history' = 24 passwords",
        "8. Apply to all domain computers"
      ],
      registry: [
        "# Enforce password complexity",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\Netlogon\\Parameters' /v 'RequireSignOrSeal' /t REG_DWORD /d 1 /f",
        "",
        "# Enable password expiration",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\Netlogon\\Parameters' /v 'MaxPasswordAge' /t REG_DWORD /d 90 /f"
      ]
    },
    linuxCommands: [
      "# Set password policy",
      "sudo apt-get install libpam-pwquality",
      "",
      "# Configure password requirements",
      "sudo nano /etc/security/pwquality.conf",
      "# Set: minlen=14, dcredit=-1, ucredit=-1, ocredit=-1, lcredit=-1",
      "",
      "# Set password expiration",
      "sudo chage -M 90 username",
      "",
      "# Force password change at next login",
      "sudo chage -d 0 username",
      "",
      "# Check password policy",
      "sudo chage -l username"
    ],
    macCommands: [
      "# Set password policy",
      "sudo defaults write /Library/Preferences/com.apple.loginwindow MinPasswordLength -int 14",
      "",
      "# Require password change",
      "sudo pwpolicy -u username -setpolicy 'requiresAlpha=1 requiresNumeric=1 requiresSymbols=1 minChars=14'"
    ],
    verification: [
      "Test password policy - weak passwords should be rejected",
      "Verify MFA is enabled for critical users",
      "Check that passwords expire after 90 days",
      "Confirm users must change password on first logon",
      "Verify certificate-based auth works"
    ],
    timeEstimate: "3-4 hours",
    references: [
      "NIST 800-171 IA-5: Authentication",
      "Microsoft: Password Policy",
      "CIS: Authentication"
    ],
    risks: [
      "Weak passwords can be easily cracked",
      "Users may write down complex passwords",
      "MFA fatigue may reduce effectiveness"
    ],
    bestPractices: [
      "Require minimum 14-character passwords",
      "Implement MFA for all users",
      "Use certificate-based auth for services",
      "Rotate passwords regularly",
      "Monitor authentication attempts"
    ]
  },
  {
    id: "SC.L2-3.13.1",
    title: "Monitor, control, and protect communications at external boundaries",
    domain: "SC",
    difficulty: "Hard",
    category: "Network",
    description: "Implement controls to monitor and protect all communications entering and leaving your network.",
    steps: [
      "Deploy firewall",
      "Configure rules",
      "Monitor traffic",
      "Implement IDS/IPS"
    ],
    completed: false,
    prerequisites: [
      "Firewall device",
      "Network admin access",
      "IDS/IPS solution"
    ],
    tools: [
      "Firewall (Palo Alto, Fortinet, etc.)",
      "IDS/IPS (Snort, Suricata)",
      "SIEM (Splunk, ELK)"
    ],
    windowsCommands: {
      powershell: [
        "# Get firewall status",
        "Get-NetFirewallProfile -PolicyStore ActiveStore",
        "",
        "# Enable Windows Defender Firewall",
        "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True",
        "",
        "# Create inbound firewall rule",
        "New-NetFirewallRule -DisplayName 'Allow HTTP' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 80",
        "",
        "# Create outbound firewall rule",
        "New-NetFirewallRule -DisplayName 'Block Telnet' -Direction Outbound -Action Block -Protocol TCP -RemotePort 23",
        "",
        "# List all firewall rules",
        "Get-NetFirewallRule -PolicyStore ActiveStore | Select-Object DisplayName, Direction, Action, Enabled",
        "",
        "# Monitor network connections",
        "Get-NetTCPConnection | Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, State"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Navigate to: Computer Configuration > Policies > Windows Settings > Security Settings > Windows Defender Firewall with Advanced Security",
        "3. Configure 'Inbound Rules' - allow only necessary traffic",
        "4. Configure 'Outbound Rules' - block unnecessary outbound traffic",
        "5. Set 'Firewall state' = On for all profiles",
        "6. Apply to all computers"
      ],
      registry: [
        "# Enable firewall",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\DomainProfile' /v 'EnableFirewall' /t REG_DWORD /d 1 /f",
        "",
        "# Block all inbound by default",
        "reg add 'HKLM\\System\\CurrentControlSet\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\DomainProfile' /v 'DefaultInboundAction' /t REG_DWORD /d 1 /f"
      ]
    },
    linuxCommands: [
      "# Install UFW firewall",
      "sudo apt-get install ufw",
      "",
      "# Enable firewall",
      "sudo ufw enable",
      "",
      "# Set default policies",
      "sudo ufw default deny incoming",
      "sudo ufw default allow outgoing",
      "",
      "# Allow specific ports",
      "sudo ufw allow 22/tcp",
      "sudo ufw allow 80/tcp",
      "sudo ufw allow 443/tcp",
      "",
      "# Block specific ports",
      "sudo ufw deny 23/tcp",
      "",
      "# Monitor connections",
      "sudo netstat -tulpn",
      "",
      "# View firewall rules",
      "sudo ufw status verbose"
    ],
    macCommands: [
      "# Enable macOS firewall",
      "sudo defaults write /Library/Preferences/com.apple.alf globalstate -int 1",
      "",
      "# Block all incoming connections",
      "sudo defaults write /Library/Preferences/com.apple.alf allowdownloadsignedenabled -int 0",
      "",
      "# Monitor network connections",
      "netstat -an | grep ESTABLISHED"
    ],
    verification: [
      "Verify firewall is enabled on all systems",
      "Test that blocked ports are not accessible",
      "Confirm allowed ports are accessible",
      "Check firewall logs for blocked traffic",
      "Verify IDS/IPS is detecting threats"
    ],
    timeEstimate: "4-6 hours",
    references: [
      "NIST 800-171 SC-7: Boundary Protection",
      "CIS: Network Segmentation",
      "SANS: Firewall Best Practices"
    ],
    risks: [
      "Overly restrictive rules may block legitimate traffic",
      "Firewall misconfiguration can leave vulnerabilities",
      "Attackers may find alternate paths"
    ],
    bestPractices: [
      "Use 'deny all, allow specific' approach",
      "Document all firewall rules",
      "Monitor firewall logs regularly",
      "Test rules before deployment",
      "Update rules based on threat intelligence"
    ]
  },
  {
    id: "SC.L2-3.13.2",
    title: "Establish and manage cryptographic keys for encryption of information",
    domain: "SC",
    difficulty: "Hard",
    category: "Network",
    description: "Implement proper key management for all encryption used in your organization.",
    steps: [
      "Generate encryption keys",
      "Store keys securely",
      "Rotate keys regularly",
      "Document key management"
    ],
    completed: false,
    prerequisites: [
      "PKI infrastructure",
      "Key management system",
      "Cryptography knowledge"
    ],
    tools: [
      "HashiCorp Vault",
      "Azure Key Vault",
      "OpenSSL",
      "HSM (Hardware Security Module)"
    ],
    windowsCommands: {
      powershell: [
        "# Generate self-signed certificate",
        "New-SelfSignedCertificate -DnsName 'example.com' -CertStoreLocation 'Cert:\\\\LocalMachine\\\\My' -KeyUsage KeyEncipherment, DataEncipherment -Type SSLServerAuthentication",
        "",
        "# Export certificate",
        "$cert = Get-ChildItem -Path Cert:\\\\LocalMachine\\\\My | Where-Object {$_.Subject -like '*example.com*'}",
        "Export-PfxCertificate -Cert $cert -FilePath C:\\\\Temp\\\\cert.pfx -Password (ConvertTo-SecureString 'password' -AsPlainText -Force)",
        "",
        "# Import certificate",
        "Import-PfxCertificate -FilePath C:\\\\Temp\\\\cert.pfx -CertStoreLocation Cert:\\\\LocalMachine\\\\My -Password (ConvertTo-SecureString 'password' -AsPlainText -Force)",
        "",
        "# Enable BitLocker encryption",
        "Enable-BitLocker -MountPoint 'C:' -EncryptionMethod Aes256 -UsedSpaceOnly",
        "",
        "# Check BitLocker status",
        "Get-BitLockerVolume"
      ],
      groupPolicy: [
        "1. Open Group Policy Management Console",
        "2. Navigate to: Computer Configuration > Policies > Administrative Templates > System > BitLocker Drive Encryption",
        "3. Enable 'Require additional authentication at startup'",
        "4. Set 'Choose how BitLocker-protected operating system drives can be recovered'",
        "5. Apply to all computers",
        "6. Verify BitLocker is enabled"
      ],
      registry: [
        "# Enable BitLocker",
        "reg add 'HKLM\\Software\\Policies\\Microsoft\\FVE' /v 'UseAdvancedStartup' /t REG_DWORD /d 1 /f",
        "",
        "# Require PIN for BitLocker",
        "reg add 'HKLM\\Software\\Policies\\Microsoft\\FVE' /v 'UseEnhancedBoot' /t REG_DWORD /d 1 /f"
      ]
    },
    linuxCommands: [
      "# Generate RSA key pair",
      "openssl genrsa -out private.key 4096",
      "",
      "# Generate certificate signing request",
      "openssl req -new -key private.key -out csr.csr",
      "",
      "# Generate self-signed certificate",
      "openssl x509 -req -days 365 -in csr.csr -signkey private.key -out certificate.crt",
      "",
      "# Encrypt file with GPG",
      "gpg --symmetric --cipher-algo AES256 filename",
      "",
      "# Decrypt file",
      "gpg --decrypt filename.gpg",
      "",
      "# Enable full disk encryption (LUKS)",
      "sudo cryptsetup luksFormat /dev/sdX",
      "",
      "# Open encrypted volume",
      "sudo cryptsetup luksOpen /dev/sdX encrypted_volume"
    ],
    macCommands: [
      "# Enable FileVault encryption",
      "sudo fdesetup enable",
      "",
      "# Check FileVault status",
      "sudo fdesetup status",
      "",
      "# Generate SSH key pair",
      "ssh-keygen -t rsa -b 4096",
      "",
      "# Encrypt file with openssl",
      "openssl enc -aes-256-cbc -in file.txt -out file.enc"
    ],
    verification: [
      "Verify all drives are encrypted",
      "Check certificate validity",
      "Confirm keys are stored securely",
      "Test key rotation process",
      "Verify encrypted data can be decrypted"
    ],
    timeEstimate: "4-6 hours",
    references: [
      "NIST 800-171 SC-12: Cryptographic Key Establishment and Management",
      "NIST SP 800-57: Key Management",
      "CIS: Encryption"
    ],
    risks: [
      "Lost keys make data unrecoverable",
      "Weak key management can compromise encryption",
      "Key rotation failures can leave old keys exposed"
    ],
    bestPractices: [
      "Use strong key sizes (4096-bit RSA or 256-bit AES)",
      "Store keys in secure locations (HSM, vault)",
      "Rotate keys regularly",
      "Document all keys and their purposes",
      "Implement key escrow for recovery"
    ]
  }
];
