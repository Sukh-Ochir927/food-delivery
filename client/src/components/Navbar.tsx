type NavbarProps = {
  address: string;
  cartCount: number;
  isLoggedIn: boolean;
  onAddressChange: (address: string) => void;
  onLogout: () => void;
  onRequestLogin: () => void;
};

export function Navbar({
  address,
  cartCount,
  isLoggedIn,
  onAddressChange,
  onLogout,
  onRequestLogin,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#181818]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#ef4444] text-xl font-black">
            N
          </div>
          <div>
            <p className="text-lg font-black leading-none">NomNom</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Food delivery
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
          <label className="hidden min-w-0 items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#171717] shadow-lg sm:flex">
            <span className="text-[#ef4444]">Location</span>
            <input
              value={address}
              onChange={(event) => onAddressChange(event.target.value)}
              placeholder="Delivery address"
              className="w-44 bg-transparent text-sm outline-none placeholder:text-neutral-400 lg:w-64"
            />
          </label>

          <button
            type="button"
            aria-label="Cart"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-[#171717] shadow-lg transition hover:bg-neutral-100"
          >
            <span aria-hidden="true" className="text-lg">
              BAG
            </span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef4444] px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            aria-label={isLoggedIn ? "Log out" : "Log in"}
            onClick={isLoggedIn ? onLogout : onRequestLogin}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-sm font-black text-[#171717] shadow-lg transition hover:bg-neutral-100"
          >
            {isLoggedIn ? "Out" : "In"}
          </button>
        </div>
      </div>
    </header>
  );
}
