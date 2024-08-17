function getCurrentYear() {
  return new Date().getFullYear();
}

export default function Footer() {
  const year = getCurrentYear();
  return (
    <footer className="mx-auto flex max-w-xl flex-col items-center justify-between px-4 pb-4 text-xs text-slate-500 md:text-sm">
      <span>Barbell Load Calculator</span>

      <small>Copyright &copy; {year}</small>

      {/* <a
        href="https://garciadev.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline underline-offset-4"
      >
        FrontendBy-GJ
      </a> */}
    </footer>
  );
}
