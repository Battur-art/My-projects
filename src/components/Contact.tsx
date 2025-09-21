import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@f1showcase.com", label: "Email" },
  ];

  return (
    <section className="py-20 px-6 bg-f1-carbon border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-racing font-black mb-6">
            <span className="heading-f1">GET IN TOUCH</span>
          </h2>
          <p className="text-xl text-f1-silver max-w-3xl mx-auto">
            Connect with us to discuss Formula 1, technology, or racing passion
          </p>
        </div>
        
        <div className="flex justify-center gap-8 mb-12">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="card-f1 p-6 hover:shadow-racing transition-all duration-300 group"
              aria-label={link.label}
            >
              <link.icon 
                size={32} 
                className="text-f1-red group-hover:text-f1-white transition-colors duration-300" 
              />
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <div className="card-f1 p-8 inline-block">
            <h3 className="text-2xl font-racing font-bold text-f1-white mb-4">
              F1 Showcase Portfolio
            </h3>
            <p className="text-f1-silver mb-4">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm text-f1-gray">
              © 2024 F1 Showcase. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;