import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="homepage">
      <main className="homepage-main">
        <h1 className="homepage-title">Welcome to Habit Tracker!</h1>
        <p className="homepage-description">Keep track of your daily and weekly habits to build up routines.</p>
      </main>
      <Toaster />
    </div>
  );
}
