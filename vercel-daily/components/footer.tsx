export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {currentYear} vercel daily. All rights reserved.</p>
    </footer>
  );
}