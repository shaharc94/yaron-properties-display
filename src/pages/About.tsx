
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Award, Clock, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 ml-1" />
                  דף הבית
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about">אודות</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-realestate-primary mb-8 text-right">אודות ירון נכסים</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <p className="text-lg mb-6 text-right leading-relaxed">
                חברת ירון נכסים הוקמה בשנת 2005 על ידי ירון כהן, מתוך חזון להפוך את חווית רכישת או השכרת נכס לפשוטה, 
                נעימה ומקצועית. החברה מתמחה בתיווך נכסים באזור רמת גן וגבעתיים, ומציעה שירותי תיווך ברמה הגבוהה ביותר.
              </p>
              
              <p className="text-lg mb-6 text-right leading-relaxed">
                אנו בירון נכסים מאמינים כי רכישת או מכירת נכס היא אחת ההחלטות הכלכליות החשובות ביותר בחיים, ולכן אנו 
                מחויבים להעניק ללקוחותינו את הליווי המקצועי והאישי הטוב ביותר, משלב החיפוש הראשוני ועד להשלמת העסקה.
              </p>
              
              <p className="text-lg text-right leading-relaxed">
                הצוות שלנו מורכב ממתווכים בעלי ניסיון וידע מקיף בשוק הנדל"ן המקומי, המכירים כל רחוב ושכונה באזור. 
                אנו עומדים לרשותכם בכל שאלה או התייעצות, ושמחים להעניק לכם את השירות האיכותי והמקצועי ביותר.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-realestate-primary" />
                <h3 className="text-xl font-bold mb-3">מקצועיות</h3>
                <p className="text-gray-600">צוות מתווכים מנוסה ומקצועי בעל ידע מקיף בשוק הנדל"ן המקומי</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-realestate-primary" />
                <h3 className="text-xl font-bold mb-3">זמינות</h3>
                <p className="text-gray-600">שירות אישי וזמין לאורך כל הדרך, מהחיפוש הראשוני ועד להשלמת העסקה</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-realestate-primary" />
                <h3 className="text-xl font-bold mb-3">אמינות</h3>
                <p className="text-gray-600">עבודה בשקיפות מלאה וביושרה, עם דגש על האינטרסים של הלקוח</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
