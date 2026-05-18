export const metadata = {
  title: "Batik Yedijah - Modern Batik with AI Styling",
  description: "AI-powered batik fashion for young professionals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}