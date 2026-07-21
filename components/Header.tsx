"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  headerNav,
  isNavGroup,
  site,
  type HeaderNavItem,
} from "@/lib/site";
import {
  BookNowButton,
  PortalLink,
  TextButton,
} from "@/components/CtaButtons";
import { Logo } from "@/components/Logo";

function DesktopDropdown({ item }: { item: Extract<HeaderNavItem, { children: unknown }> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <span className="text-[10px] text-ink-muted/70" aria-hidden>
          ▾
        </span>
      </button>
      <div
        id={menuId}
        role="menu"
        className={`absolute left-1/2 top-full z-50 min-w-[12.5rem] -translate-x-1/2 pt-2 transition ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="border border-stone bg-white py-2 shadow-sm">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="block px-4 py-2.5 text-[13px] font-medium text-ink-muted transition-colors hover:bg-mist hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMobileSection(null);
  }, [pathname]);

  const solid = scrolled || open || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-stone bg-white/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:h-[4.25rem] md:px-8">
        <div onClick={() => setOpen(false)} className="inline-flex shrink-0">
          <Logo size="nav" priority />
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {headerNav.map((item) =>
            isNavGroup(item) ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <PortalLink className="text-[13px] font-medium text-ink-muted no-underline hover:text-ink" />
          <BookNowButton className="px-4 py-2.5 text-[13px]" />
        </div>

        <button
          type="button"
          className="border border-stone bg-white/80 px-3 py-1.5 text-[13px] font-medium text-ink lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone bg-white lg:hidden">
          <nav
            className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-6xl flex-col overflow-y-auto px-5 py-4"
            aria-label="Mobile"
          >
            {headerNav.map((item) =>
              isNavGroup(item) ? (
                <div key={item.label} className="border-b border-stone">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-medium text-ink"
                    aria-expanded={mobileSection === item.label}
                    onClick={() =>
                      setMobileSection((s) =>
                        s === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <span className="text-[11px] text-ink-muted" aria-hidden>
                      {mobileSection === item.label ? "−" : "+"}
                    </span>
                  </button>
                  {mobileSection === item.label && (
                    <div className="pb-3 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 text-[14px] text-ink-muted"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-stone py-3.5 text-[15px] font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-5 flex flex-col gap-2">
              <BookNowButton className="justify-center" />
              <a
                href={site.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-stone px-5 py-3 text-[13px] font-semibold tracking-wide text-ink"
                onClick={() => setOpen(false)}
              >
                Customer Portal
              </a>
              <TextButton className="justify-center border-stone text-ink" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
