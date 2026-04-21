export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <span className="font-bold text-foreground">ClickMasters</span>
            </div>
            <p className="text-sm text-foreground/60">
              The most powerful platform for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Features</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Security</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">About</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Cookies</a></li>
              <li><a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60">
            © 2026 ClickMasters. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">Twitter</a>
            <a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">LinkedIn</a>
            <a href="/#contact" className="text-foreground/60 hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
