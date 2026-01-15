export function Footer() {
  const openHour = 12;
  const closeHour = 22;
  const currentHours = new Date().getHours();
  const isOpen = currentHours<closeHour && currentHours >=openHour;
  return <footer>
    {isOpen ? <p>We are curently open</p> : <p>sorry, We are closed.</p>}
    </footer>;
}
