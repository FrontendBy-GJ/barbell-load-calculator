import logo from "../assets/blc-logo.svg";

export default function Header() {
  return (
    <header role="banner" className="pt-4">
      <h1 className="mx-auto w-fit">
        <img src={logo} alt="Barbell Load Calculator" width={320} height={60} />
      </h1>
    </header>
  );
}
