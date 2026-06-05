import styles from "./AdminLogin.module.css";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : {};
  const hasError = params?.error === "1";

  return (
    <main className={styles.loginPage}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <section className={styles.loginCard}>
        <span>// Secure Admin</span>

        <h1>Admin Login</h1>

        <p>Enter your admin password to view contact submissions.</p>

        <form action="/api/admin/login" method="POST">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter admin password"
            required
            autoComplete="current-password"
          />

          {hasError && (
            <p className={styles.error}>Invalid password. Try again.</p>
          )}

          <button type="submit" data-cursor="dark">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}