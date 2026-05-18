const footerLinks = ["Menu", "Delivery", "Contact"];
const menuLinks = ["Appetizers", "Salads", "Lunch favorites"];
const socialLinks = ["Facebook", "Instagram", "Twitter"];

export function Footer() {
  return (
    <footer className="bg-[#181818] pb-[620px] text-white xl:pb-0 xl:pr-[420px]">
      <div className="overflow-hidden bg-[#ef4444] py-4">
        <div className="flex min-w-max gap-8 whitespace-nowrap text-xl font-black uppercase tracking-[0.12em]">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index}>Fresh fast delivered</span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#ef4444] text-xl font-black">
              N
            </div>
            <div>
              <p className="text-xl font-black">NomNom</p>
              <p className="mt-1 text-sm font-semibold text-white/45">Fresh food delivery</p>
            </div>
          </div>
        </div>

        <FooterColumn title="Navigation" links={footerLinks} />
        <FooterColumn title="Menu" links={menuLinks} />
        <FooterColumn title="Social" links={socialLinks} />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-white/10 px-4 py-6 text-sm font-semibold text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Copyright 2026 NomNom. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white">
            Privacy policy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white/45">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="font-semibold text-white/80 transition hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
