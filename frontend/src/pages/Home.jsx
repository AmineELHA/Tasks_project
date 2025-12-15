import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FolderKanban, ListTodo, TrendingUp, Users, Calendar } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <FolderKanban className="h-8 w-8 text-primary" />,
      title: "Project Management",
      description: "Create and organize multiple projects in one place. Keep track of all your initiatives with ease."
    },
    {
      icon: <ListTodo className="h-8 w-8 text-primary" />,
      title: "Task Tracking",
      description: "Add tasks to your projects, set descriptions, and mark them as complete when done."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Due Dates",
      description: "Set due dates for your tasks to stay on schedule and never miss a deadline."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Progress Monitoring",
      description: "View real-time progress of your projects with visual progress bars and completion percentages."
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: "Task Completion",
      description: "Mark tasks as complete and instantly see your project progress update."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Personal Workspace",
      description: "Secure user authentication ensures your projects and tasks remain private to you."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Organize Your Projects,
            <br />
            <span className="text-primary">Accomplish Your Goals</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            A simple and powerful task management application to help you track your projects,
            manage tasks, and monitor progress all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Start Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Everything You Need</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All the features you need to manage your projects efficiently and stay organized
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">How It Works</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="text-xl font-semibold mb-2">Create Projects</h4>
            <p className="text-muted-foreground">
              Start by creating projects for different areas of your work or life
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="text-xl font-semibold mb-2">Add Tasks</h4>
            <p className="text-muted-foreground">
              Break down your projects into manageable tasks with descriptions and due dates
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="text-xl font-semibold mb-2">Track Progress</h4>
            <p className="text-muted-foreground">
              Monitor your progress and complete tasks to reach your goals
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Organized?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join now and start managing your projects effectively
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-12">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Task Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
