import logo from "../assets/blc-logo.svg";

export default function Header() {
  return (
    <header role="banner" className="header mx-auto w-full max-w-7xl">
      <h1 className="mx-auto w-fit">
        <img src={logo} alt="Barbell Load Calculator" width={320} height={60} />
      </h1>
    </header>
  );
}
