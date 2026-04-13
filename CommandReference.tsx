import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ArrowLeft, Copy, Check, Download } from "lucide-react";

export default function CommandReference() {
  const [, setLocation] = useLocation();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<"windows" | "linux" | "mac">("windows");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setLocation("/");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/");
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadCheatSheet = () => {
    const content = generateCheatSheetContent();
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", "CMMC-Commands-Cheatsheet.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateCheatSheetContent = () => {
    return `CMMC LEVEL 2 COMPLIANCE DASHBOARD
COMMAND REFERENCE CHEAT SHEET
Created by Muhammad Bilal
Generated: ${new Date().toLocaleString()}

========================================
WINDOWS POWERSHELL COMMANDS
========================================

1. ACTIVE DIRECTORY MANAGEMENT
-----------------------------------
# List all user accounts
Get-ADUser -Filter * -Properties Name, SamAccountName, Enabled, LastLogonDate | Select-Object Name, SamAccountName, Enabled, LastLogonDate | Export-Csv -Path C:\\Temp\\ADUsers.csv -NoTypeInformation

# Find disabled accounts
Get-ADUser -Filter 'Enabled -eq $false' -Properties Name, DisabledDate | Select-Object Name, DisabledDate

# Find accounts not logged in for 90 days
$90DaysAgo = (Get-Date).AddDays(-90)
Get-ADUser -Filter 'LastLogonDate -lt $90DaysAgo' -Properties Name, LastLogonDate | Select-Object Name, LastLogonDate

# Disable a user account
Disable-ADAccount -Identity 'username'

# Unlock a locked account
Unlock-ADAccount -Identity 'username'

# Find locked accounts
Search-ADAccount -LockedOut | Select-Object Name, SamAccountName

# Set password policy
Set-ADDefaultDomainPasswordPolicy -MinPasswordLength 14 -MaxPasswordAge 90 -MinPasswordAge 1 -PasswordHistoryCount 24 -ComplexityEnabled $true

# Check password expiration
Get-ADUser -Identity 'username' -Properties PasswordLastSet | Select-Object Name, PasswordLastSet

2. FIREWALL MANAGEMENT
-----------------------------------
# Get firewall status
Get-NetFirewallProfile -PolicyStore ActiveStore

# Enable Windows Defender Firewall
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True

# Create inbound firewall rule
New-NetFirewallRule -DisplayName 'Allow HTTP' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 80

# Create outbound firewall rule
New-NetFirewallRule -DisplayName 'Block Telnet' -Direction Outbound -Action Block -Protocol TCP -RemotePort 23

# List all firewall rules
Get-NetFirewallRule -PolicyStore ActiveStore | Select-Object DisplayName, Direction, Action, Enabled

# Monitor network connections
Get-NetTCPConnection | Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, State

3. ENCRYPTION & BITLOCKER
-----------------------------------
# Enable BitLocker encryption
Enable-BitLocker -MountPoint 'C:' -EncryptionMethod Aes256 -UsedSpaceOnly

# Check BitLocker status
Get-BitLockerVolume

# Generate self-signed certificate
New-SelfSignedCertificate -DnsName 'example.com' -CertStoreLocation 'Cert:\\\\LocalMachine\\\\My' -KeyUsage KeyEncipherment, DataEncipherment -Type SSLServerAuthentication

4. AUDITING & LOGGING
-----------------------------------
# Monitor failed logon attempts
Get-EventLog -LogName Security -InstanceId 4625 | Select-Object TimeGenerated, Message | Sort-Object TimeGenerated -Descending | Select-Object -First 20

# Monitor admin account usage
Get-EventLog -LogName Security -InstanceId 4624 | Where-Object {$_.Message -like '*Administrators*'} | Select-Object TimeGenerated, Message

# Enable process tracking
auditpol /set /subcategory:'Process Creation' /success:enable

# Enable failed logon auditing
auditpol /set /subcategory:'Logon/Logoff' /failure:enable

========================================
LINUX COMMANDS
========================================

1. USER ACCOUNT MANAGEMENT
-----------------------------------
# List all user accounts
cat /etc/passwd | cut -d: -f1,3,6

# List only human users (UID >= 1000)
awk -F: '$3 >= 1000 {print $1, $3, $6}' /etc/passwd

# Find accounts with no password set
awk -F: '($2 == "" || $2 == "!") {print $1}' /etc/shadow

# Create standard user account
sudo useradd -m -s /bin/bash jdoe

# Set password
sudo passwd jdoe

# Disable a user account
usermod -L username

# Lock account after inactivity (set to 90 days)
useradd -f 90 username

# Check last login
lastlog | grep username

# Remove user account
userdel -r username

2. FIREWALL MANAGEMENT (UFW)
-----------------------------------
# Install UFW firewall
sudo apt-get install ufw

# Enable firewall
sudo ufw enable

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow specific ports
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block specific ports
sudo ufw deny 23/tcp

# View firewall rules
sudo ufw status verbose

3. ENCRYPTION
-----------------------------------
# Generate RSA key pair
openssl genrsa -out private.key 4096

# Generate certificate signing request
openssl req -new -key private.key -out csr.csr

# Generate self-signed certificate
openssl x509 -req -days 365 -in csr.csr -signkey private.key -out certificate.crt

# Encrypt file with GPG
gpg --symmetric --cipher-algo AES256 filename

# Decrypt file
gpg --decrypt filename.gpg

# Enable full disk encryption (LUKS)
sudo cryptsetup luksFormat /dev/sdX

4. MONITORING & AUDITING
-----------------------------------
# Monitor network connections
sudo netstat -tulpn

# Check sudo usage
sudo grep 'sudo' /var/log/auth.log

# Monitor failed login attempts
sudo grep 'Failed password' /var/log/auth.log

# Check system logs
sudo journalctl -u servicename -f

# List service accounts
awk -F: '$3 < 1000 {print $1, $3}' /etc/passwd

========================================
MACOS COMMANDS
========================================

1. USER ACCOUNT MANAGEMENT
-----------------------------------
# List all user accounts
dscl . list /Users | grep -v '^_'

# Get user details
dscl . read /Users/username

# Disable user account
dscl . create /Users/username UserShell /usr/bin/false

# Create standard user
sudo dscl . -create /Users/jdoe UserShell /bin/bash

# Create admin account
sudo dscl . -create /Users/jdoe-admin UserShell /bin/bash

# Add to admin group
sudo dscl . -append /Groups/admin GroupMembership jdoe-admin

2. ENCRYPTION
-----------------------------------
# Enable FileVault encryption
sudo fdesetup enable

# Check FileVault status
sudo fdesetup status

# Generate SSH key pair
ssh-keygen -t rsa -b 4096

# Encrypt file with openssl
openssl enc -aes-256-cbc -in file.txt -out file.enc

3. FIREWALL
-----------------------------------
# Enable macOS firewall
sudo defaults write /Library/Preferences/com.apple.alf globalstate -int 1

# Block all incoming connections
sudo defaults write /Library/Preferences/com.apple.alf allowdownloadsignedenabled -int 0

# Monitor network connections
netstat -an | grep ESTABLISHED

4. MONITORING
-----------------------------------
# Monitor system processes
ps aux | head -20

# Monitor failed login attempts
log stream --predicate 'eventMessage contains[cd] "failed"' --level debug

# Monitor sudo usage
log stream --predicate 'eventMessage contains[cd] "sudo"'

# Check last login
log show --predicate 'eventMessage contains[cd] "session started"' --last 1h

========================================
QUICK REFERENCE TIPS
========================================

WINDOWS:
- Use PowerShell ISE for testing commands before deployment
- Always run PowerShell as Administrator for AD commands
- Use Group Policy for organization-wide settings
- Check Event Viewer regularly for security events

LINUX:
- Use 'sudo' for administrative commands
- Check /var/log/auth.log for authentication events
- Use 'sudo visudo' to edit sudoers file safely
- Monitor with 'journalctl' for systemd services

MACOS:
- Use 'sudo' for administrative commands
- Check /var/log/system.log for system events
- Use 'log stream' for real-time monitoring
- Enable FileVault for full disk encryption

========================================
SECURITY BEST PRACTICES
========================================

1. Always test commands in a non-production environment first
2. Document all changes made to systems
3. Keep audit logs for compliance purposes
4. Regularly review and update security policies
5. Train users on security awareness
6. Monitor systems for suspicious activity
7. Implement principle of least privilege
8. Rotate passwords and keys regularly
9. Keep systems and software updated
10. Maintain backups of critical data

========================================
REFERENCES
========================================

NIST 800-171: https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final
Microsoft Security Best Practices: https://docs.microsoft.com/en-us/windows/security/
Linux Security: https://linux-audit.com/
macOS Security: https://support.apple.com/en-us/HT204899
CIS Controls: https://www.cisecurity.org/cis-controls/

========================================
Created by Muhammad Bilal
CMMC Level 2 Compliance Dashboard v2.0
`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-blue-900">Command Reference</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={downloadCheatSheet}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Cheat Sheet
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">CMMC Commands Cheat Sheet</h2>
          <p className="text-gray-600">
            Quick reference guide for implementing CMMC controls across Windows, Linux, and macOS platforms.
            Click the copy icon to copy any command to your clipboard.
          </p>
        </div>

        <Tabs defaultValue="windows" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="windows">Windows PowerShell</TabsTrigger>
            <TabsTrigger value="linux">Linux</TabsTrigger>
            <TabsTrigger value="mac">macOS</TabsTrigger>
          </TabsList>

          <TabsContent value="windows" className="space-y-6">
            <CommandSection
              title="Active Directory Management"
              commands={[
                { label: "List all user accounts", cmd: "Get-ADUser -Filter * -Properties Name, SamAccountName, Enabled, LastLogonDate | Select-Object Name, SamAccountName, Enabled, LastLogonDate | Export-Csv -Path C:\\Temp\\ADUsers.csv -NoTypeInformation" },
                { label: "Find disabled accounts", cmd: "Get-ADUser -Filter 'Enabled -eq $false' -Properties Name, DisabledDate | Select-Object Name, DisabledDate" },
                { label: "Find accounts not logged in for 90 days", cmd: "$90DaysAgo = (Get-Date).AddDays(-90); Get-ADUser -Filter 'LastLogonDate -lt $90DaysAgo' -Properties Name, LastLogonDate | Select-Object Name, LastLogonDate" },
                { label: "Disable a user account", cmd: "Disable-ADAccount -Identity 'username'" },
                { label: "Unlock a locked account", cmd: "Unlock-ADAccount -Identity 'username'" },
                { label: "Find locked accounts", cmd: "Search-ADAccount -LockedOut | Select-Object Name, SamAccountName" },
                { label: "Set password policy", cmd: "Set-ADDefaultDomainPasswordPolicy -MinPasswordLength 14 -MaxPasswordAge 90 -MinPasswordAge 1 -PasswordHistoryCount 24 -ComplexityEnabled $true" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Firewall Management"
              commands={[
                { label: "Get firewall status", cmd: "Get-NetFirewallProfile -PolicyStore ActiveStore" },
                { label: "Enable Windows Defender Firewall", cmd: "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True" },
                { label: "Create inbound firewall rule", cmd: "New-NetFirewallRule -DisplayName 'Allow HTTP' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 80" },
                { label: "Create outbound firewall rule", cmd: "New-NetFirewallRule -DisplayName 'Block Telnet' -Direction Outbound -Action Block -Protocol TCP -RemotePort 23" },
                { label: "List all firewall rules", cmd: "Get-NetFirewallRule -PolicyStore ActiveStore | Select-Object DisplayName, Direction, Action, Enabled" },
                { label: "Monitor network connections", cmd: "Get-NetTCPConnection | Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, State" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Encryption & BitLocker"
              commands={[
                { label: "Enable BitLocker encryption", cmd: "Enable-BitLocker -MountPoint 'C:' -EncryptionMethod Aes256 -UsedSpaceOnly" },
                { label: "Check BitLocker status", cmd: "Get-BitLockerVolume" },
                { label: "Generate self-signed certificate", cmd: "New-SelfSignedCertificate -DnsName 'example.com' -CertStoreLocation 'Cert:\\\\LocalMachine\\\\My' -KeyUsage KeyEncipherment, DataEncipherment -Type SSLServerAuthentication" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Auditing & Logging"
              commands={[
                { label: "Monitor failed logon attempts", cmd: "Get-EventLog -LogName Security -InstanceId 4625 | Select-Object TimeGenerated, Message | Sort-Object TimeGenerated -Descending | Select-Object -First 20" },
                { label: "Monitor admin account usage", cmd: "Get-EventLog -LogName Security -InstanceId 4624 | Where-Object {$_.Message -like '*Administrators*'} | Select-Object TimeGenerated, Message" },
                { label: "Enable process tracking", cmd: "auditpol /set /subcategory:'Process Creation' /success:enable" },
                { label: "Enable failed logon auditing", cmd: "auditpol /set /subcategory:'Logon/Logoff' /failure:enable" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />
          </TabsContent>

          <TabsContent value="linux" className="space-y-6">
            <CommandSection
              title="User Account Management"
              commands={[
                { label: "List all user accounts", cmd: "cat /etc/passwd | cut -d: -f1,3,6" },
                { label: "List only human users (UID >= 1000)", cmd: "awk -F: '$3 >= 1000 {print $1, $3, $6}' /etc/passwd" },
                { label: "Find accounts with no password set", cmd: "awk -F: '($2 == \"\" || $2 == \"!\") {print $1}' /etc/shadow" },
                { label: "Create standard user account", cmd: "sudo useradd -m -s /bin/bash jdoe" },
                { label: "Set password", cmd: "sudo passwd jdoe" },
                { label: "Disable a user account", cmd: "usermod -L username" },
                { label: "Check last login", cmd: "lastlog | grep username" },
                { label: "Remove user account", cmd: "userdel -r username" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Firewall Management (UFW)"
              commands={[
                { label: "Install UFW firewall", cmd: "sudo apt-get install ufw" },
                { label: "Enable firewall", cmd: "sudo ufw enable" },
                { label: "Set default policies", cmd: "sudo ufw default deny incoming && sudo ufw default allow outgoing" },
                { label: "Allow SSH", cmd: "sudo ufw allow 22/tcp" },
                { label: "Allow HTTP", cmd: "sudo ufw allow 80/tcp" },
                { label: "Allow HTTPS", cmd: "sudo ufw allow 443/tcp" },
                { label: "Block Telnet", cmd: "sudo ufw deny 23/tcp" },
                { label: "View firewall rules", cmd: "sudo ufw status verbose" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Encryption"
              commands={[
                { label: "Generate RSA key pair", cmd: "openssl genrsa -out private.key 4096" },
                { label: "Generate certificate signing request", cmd: "openssl req -new -key private.key -out csr.csr" },
                { label: "Generate self-signed certificate", cmd: "openssl x509 -req -days 365 -in csr.csr -signkey private.key -out certificate.crt" },
                { label: "Encrypt file with GPG", cmd: "gpg --symmetric --cipher-algo AES256 filename" },
                { label: "Decrypt file", cmd: "gpg --decrypt filename.gpg" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Monitoring & Auditing"
              commands={[
                { label: "Monitor network connections", cmd: "sudo netstat -tulpn" },
                { label: "Check sudo usage", cmd: "sudo grep 'sudo' /var/log/auth.log" },
                { label: "Monitor failed login attempts", cmd: "sudo grep 'Failed password' /var/log/auth.log" },
                { label: "Check system logs", cmd: "sudo journalctl -u servicename -f" },
                { label: "List service accounts", cmd: "awk -F: '$3 < 1000 {print $1, $3}' /etc/passwd" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />
          </TabsContent>

          <TabsContent value="mac" className="space-y-6">
            <CommandSection
              title="User Account Management"
              commands={[
                { label: "List all user accounts", cmd: "dscl . list /Users | grep -v '^_'" },
                { label: "Get user details", cmd: "dscl . read /Users/username" },
                { label: "Disable user account", cmd: "dscl . create /Users/username UserShell /usr/bin/false" },
                { label: "Create standard user", cmd: "sudo dscl . -create /Users/jdoe UserShell /bin/bash" },
                { label: "Create admin account", cmd: "sudo dscl . -create /Users/jdoe-admin UserShell /bin/bash" },
                { label: "Add to admin group", cmd: "sudo dscl . -append /Groups/admin GroupMembership jdoe-admin" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Encryption"
              commands={[
                { label: "Enable FileVault encryption", cmd: "sudo fdesetup enable" },
                { label: "Check FileVault status", cmd: "sudo fdesetup status" },
                { label: "Generate SSH key pair", cmd: "ssh-keygen -t rsa -b 4096" },
                { label: "Encrypt file with openssl", cmd: "openssl enc -aes-256-cbc -in file.txt -out file.enc" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Firewall"
              commands={[
                { label: "Enable macOS firewall", cmd: "sudo defaults write /Library/Preferences/com.apple.alf globalstate -int 1" },
                { label: "Block all incoming connections", cmd: "sudo defaults write /Library/Preferences/com.apple.alf allowdownloadsignedenabled -int 0" },
                { label: "Monitor network connections", cmd: "netstat -an | grep ESTABLISHED" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />

            <CommandSection
              title="Monitoring"
              commands={[
                { label: "Monitor system processes", cmd: "ps aux | head -20" },
                { label: "Monitor failed login attempts", cmd: "log stream --predicate 'eventMessage contains[cd] \"failed\"' --level debug" },
                { label: "Monitor sudo usage", cmd: "log stream --predicate 'eventMessage contains[cd] \"sudo\"'" },
                { label: "Check last login", cmd: "log show --predicate 'eventMessage contains[cd] \"session started\"' --last 1h" },
              ]}
              onCopy={copyToClipboard}
              copiedIndex={copiedIndex}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-600">
        <p>Created by <strong>Muhammad Bilal</strong></p>
        <p className="mt-1 text-xs text-gray-500">CMMC Level 2 Compliance Dashboard v2.0</p>
      </footer>
    </div>
  );
}

interface CommandSectionProps {
  title: string;
  commands: Array<{ label: string; cmd: string }>;
  onCopy: (text: string, index: number) => void;
  copiedIndex: number | null;
}

function CommandSection({ title, commands, onCopy, copiedIndex }: CommandSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {commands.map((item, idx) => (
          <div key={idx}>
            <p className="text-sm font-semibold text-gray-700 mb-1">{item.label}</p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto relative group">
              <code>{item.cmd}</code>
              <button
                onClick={() => onCopy(item.cmd, idx)}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition"
                title="Copy to clipboard"
              >
                {copiedIndex === idx ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
