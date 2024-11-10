import { CardSpotlight } from "./ui/card-spotlight";

export default function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <CardSpotlight
      radius={120}
      color="#0bee71  "
      className=" bg-bg-200 p-4 rounded-lg border border-accent-200 lg:p-8 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-darkPrimary-100">
        {icon} {title}
      </h3>
      <p className="text-text-100 font-medium">{description}</p>
    </CardSpotlight>
  );
}
