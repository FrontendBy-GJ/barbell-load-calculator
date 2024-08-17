import barbell from "../../assets/barbell.png";
import "./header.css";

export default function Header() {
  return (
    <header role="banner">
      <div className="relative">
        <img
          src={barbell}
          width="300"
          alt="Barbell Load Calculator Logo"
          className="mx-auto h-24 object-contain"
          loading="lazy"
        />
        <h1 className="acronym absolute left-0 right-0 top-1/2 mx-auto w-fit -translate-y-1/2 bg-[var(--bg-clr)] px-2 py-1 text-6xl tracking-wide text-blue-600">
          <abbr
            title="Barbell Load Calculator"
            className="relative before:absolute before:-top-0 before:left-1/2 before:right-1/2 before:h-2 before:w-[110px] before:-translate-x-1/2 before:rounded before:bg-current after:absolute after:-bottom-2 after:left-1/2 after:right-1/2 after:h-2 after:w-[110px] after:-translate-x-1/2 after:rounded after:bg-current"
          >
            BLC
          </abbr>
        </h1>
      </div>
    </header>
  );
}
