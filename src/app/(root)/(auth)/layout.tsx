export default async function AuthLayout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  return (
    <main className="flex min-h-screen items-center justify-center p-2">
      {props.children}
    </main>
  )
}
