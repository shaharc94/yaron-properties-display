
import { ShieldCheck, Zap, Award, Clock } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-realestate-secondary" />,
    title: "אמינות ומקצועיות",
    description: "אנחנו מחויבים לשקיפות מלאה ולסטנדרטים מקצועיים גבוהים בכל עסקה."
  },
  {
    icon: <Zap className="h-10 w-10 text-realestate-secondary" />,
    title: "מהירות וזמינות",
    description: "אנחנו זמינים עבורכם בכל עת ומספקים שירות מהיר ויעיל."
  },
  {
    icon: <Award className="h-10 w-10 text-realestate-secondary" />,
    title: "ניסיון עשיר",
    description: "צוות המומחים שלנו בעל ניסיון עשיר בשוק הנדל\"ן הישראלי."
  },
  {
    icon: <Clock className="h-10 w-10 text-realestate-secondary" />,
    title: "חיסכון בזמן",
    description: "אנו מתאימים לכם את הנכסים הרלוונטיים ביותר וחוסכים לכם זמן יקר."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-realestate-primary mb-4">למה לבחור בירון נכסים?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            אנו מספקים שירות איכותי ואמין ודואגים תמיד לאינטרסים של הלקוחות שלנו.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center rounded-full bg-realestate-accent p-3 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-realestate-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
