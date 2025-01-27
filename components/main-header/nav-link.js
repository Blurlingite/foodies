// this file is used so that we didn't have to put "use client" in main-header.js
"use client";
import Link from "next/link";
import classes from "./nav-link.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname(); // gives you the path after the domain Ex. "/community"

  return (
    /* for className, if the path is "/meals", apply the "link" and "active" css style to highlight
     when on that page. Otherwise, just add "link" */
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
