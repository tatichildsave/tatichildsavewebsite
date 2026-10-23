import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { MARKETING_NAV, LEARNING_PORTAL_URL } from "../../config/navigation";
import { APPLICATION_FORM_URL } from "../../config/application";
import { useAppSelector } from "../../store";
export function GuidedHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const active = useAppSelector((s) => s.ui.activeTab);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  return (
    <header className="site-header guided-header">
      <div className="header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="TATI ChildSave home"
          onClick={() => setOpen(false)}
        >
          <img
            className="brand-logo"
            src="/assets/tati-logo.png"
            alt="Tati"
            width="48"
            height="48"
          />
          <span className="brand-product">
            ChildSave<small>Little lessons. Lifelong confidence.</small>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="marketing-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="marketing-nav"
          aria-label="Main navigation"
          className={open ? "nav-open" : ""}
        >
          {MARKETING_NAV.map(([label, route]) => (
            <a
              key={route}
              href={"#" + route}
              aria-current={active === route ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="guided-portal"
            href={LEARNING_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learning Portal <ArrowUpRight size={12} />
          </a>
          <a
            className="header-cta"
            href={APPLICATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join a Founding Family <ArrowUpRight size={15} />
          </a>
          <a
            className="guided-mobile-about"
            href="#about"
            onClick={() => setOpen(false)}
          >
            About TATI
          </a>
        </nav>
      </div>
    </header>
  );
}
