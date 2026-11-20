# PF-04 — Understanding DNS and How a Website Loads

DNS stands for Domain Name System. It works like the internet's phonebook. People remember website names such as `hamid-shoukat.vercel.app`, but computers use IP addresses to locate servers. DNS translates a human-readable domain name into the information needed to reach the correct website.

When someone enters my website address in a browser, the browser first needs to find where that domain is hosted. It asks a DNS resolver, which is usually provided by the internet service provider or a public DNS service. The resolver checks whether it already has the answer saved in its cache. If it does, it can return the information immediately.

If the answer is not cached, the resolver follows the DNS hierarchy. It can ask a root nameserver where to find the relevant top-level domain server, such as `.com` or `.app`. The top-level domain (TLD) nameserver then directs it to the domain's authoritative nameserver. The authoritative nameserver holds the actual DNS records for that domain and provides the requested answer, such as an IP address or another hostname.

A DNS record is an instruction that tells the resolver how a domain should be handled. One common record is an A record, which maps a hostname to an IPv4 address. Another is a CNAME record, which makes one hostname an alias of another hostname. For example, a subdomain such as `www.example.com` could point to a hosting provider's assigned hostname using a CNAME record. The resolver then looks up the target hostname to find the address it needs. A CNAME does not directly contain an IP address.

After DNS resolution, the browser uses the returned information to connect to the hosting service. For an HTTPS website, the browser and server establish a secure connection using TLS. The browser verifies the server's certificate, sends an HTTP request, and the hosting platform responds with the website's files or rendered page. The browser then displays the website.

In my portfolio project, Vercel handles the hosting infrastructure and HTTPS for the deployed website. I do not need to operate a physical server myself. If I connect a custom domain in the future, I will configure the DNS records requested by Vercel or my domain provider. Those records tell DNS where my website should be directed.

In short, DNS helps the browser find the right destination, the hosting platform serves the website, and HTTPS protects the connection between the visitor and the website.