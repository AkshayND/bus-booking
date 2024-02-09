import Header from "./Header";

export default function Error() {
  return (
    <>
      <Header />
      <main style={{ textAlign: "center" }}>
        <h1>An Error Occured!</h1>
        <p>Could not find this page.</p>
      </main>
    </>
  );
}
