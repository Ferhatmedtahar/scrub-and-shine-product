"use client";
import { FaChartLine, FaHome, FaTasks } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export default function Features() {
  const features: FeatureCardProps[] = [
    {
      title: "Easy Task Management",
      description: "Organize and track your cleaning tasks effortlessly",
      icon: <FaTasks />,
    },
    {
      title: "Room-based Organization",
      description: "Manage tasks by room for better organization",
      icon: <FaHome />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your cleaning progress with intuitive analytics",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className=" max-container padding-container mt-8 pb-8 border-darkPrimary-300 border-b   ">
      <div className=" mx-auto px-4">
        <h2 className="text-2xl lg:text-4xl cursor-default text-darkPrimary-100 font-bold text-center mb-12 default-underline hover:text-darkPrimary-200 transition-all duration-100 ">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
