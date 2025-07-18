
import { User, OnboardingChecklist, ChecklistItem } from "@/types/User";

export class ChecklistGenerator {
  private commonTasks: Omit<ChecklistItem, 'id' | 'completed'>[] = [
    {
      title: "Complete HR Paperwork",
      description: "Fill out all required employment documents and tax forms",
      category: "Administrative",
      priority: "high",
      estimatedTime: 45,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Attend Welcome Meeting",
      description: "Meet with your manager and team members",
      category: "Meetings",
      priority: "high",
      estimatedTime: 60,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Set Up Email and Accounts",
      description: "Configure your email, Slack, and other company accounts",
      category: "Setup",
      priority: "high",
      estimatedTime: 30,
    },
    {
      title: "Read Company Handbook",
      description: "Review company policies, culture, and guidelines",
      category: "Learning",
      priority: "medium",
      estimatedTime: 90,
    },
    {
      title: "Complete Safety Training",
      description: "Watch safety videos and complete required certifications",
      category: "Training",
      priority: "high",
      estimatedTime: 60,
    },
  ];

  private roleTasks: Record<string, Omit<ChecklistItem, 'id' | 'completed'>[]> = {
    intern: [
      {
        title: "Meet Your Mentor",
        description: "Schedule a meeting with your assigned mentor",
        category: "Mentorship",
        priority: "high",
        estimatedTime: 30,
      },
      {
        title: "Set Learning Goals",
        description: "Define what you want to learn during your internship",
        category: "Planning",
        priority: "medium",
        estimatedTime: 45,
      },
      {
        title: "Join Intern Slack Channel",
        description: "Connect with other interns and get support",
        category: "Social",
        priority: "medium",
        estimatedTime: 15,
      },
    ],
    worker: [
      {
        title: "Set Up Development Environment",
        description: "Install necessary software and configure your workspace",
        category: "Setup",
        priority: "high",
        estimatedTime: 120,
      },
      {
        title: "Review Team Processes",
        description: "Learn about team workflows, tools, and methodologies",
        category: "Learning",
        priority: "high",
        estimatedTime: 60,
      },
      {
        title: "Schedule 1-on-1s",
        description: "Set up regular meetings with your manager and key stakeholders",
        category: "Planning",
        priority: "medium",
        estimatedTime: 30,
      },
    ],
  };

  private departmentTasks: Record<string, Omit<ChecklistItem, 'id' | 'completed'>[]> = {
    engineering: [
      {
        title: "Set Up Development Tools",
        description: "Install IDE, Git, Docker, and other development tools",
        category: "Setup",
        priority: "high",
        estimatedTime: 90,
      },
      {
        title: "Clone Code Repositories",
        description: "Get access to and clone relevant code repositories",
        category: "Setup",
        priority: "high",
        estimatedTime: 30,
      },
      {
        title: "Review Architecture Docs",
        description: "Understand the system architecture and tech stack",
        category: "Learning",
        priority: "medium",
        estimatedTime: 120,
      },
    ],
    marketing: [
      {
        title: "Access Marketing Tools",
        description: "Get set up with HubSpot, Google Analytics, and social media tools",
        category: "Setup",
        priority: "high",
        estimatedTime: 45,
      },
      {
        title: "Review Brand Guidelines",
        description: "Understand brand voice, visual identity, and messaging",
        category: "Learning",
        priority: "high",
        estimatedTime: 60,
      },
      {
        title: "Meet Content Team",
        description: "Connect with writers, designers, and content strategists",
        category: "Meetings",
        priority: "medium",
        estimatedTime: 45,
      },
    ],
    sales: [
      {
        title: "Set Up CRM Access",
        description: "Get configured with Salesforce or other CRM tools",
        category: "Setup",
        priority: "high",
        estimatedTime: 30,
      },
      {
        title: "Product Training",
        description: "Learn about our products, features, and pricing",
        category: "Training",
        priority: "high",
        estimatedTime: 180,
      },
      {
        title: "Shadow Sales Calls",
        description: "Observe experienced reps on customer calls",
        category: "Learning",
        priority: "medium",
        estimatedTime: 120,
      },
    ],
    hr: [
      {
        title: "HRIS System Training",
        description: "Learn to use our Human Resources Information System",
        category: "Training",
        priority: "high",
        estimatedTime: 90,
      },
      {
        title: "Employment Law Review",
        description: "Review current employment laws and compliance requirements",
        category: "Learning",
        priority: "high",
        estimatedTime: 120,
      },
      {
        title: "Meet Department Heads",
        description: "Introduction meetings with leaders from each department",
        category: "Meetings",
        priority: "medium",
        estimatedTime: 90,
      },
    ],
    design: [
      {
        title: "Access Design Tools",
        description: "Set up Figma, Adobe Creative Suite, and other design tools",
        category: "Setup",
        priority: "high",
        estimatedTime: 60,
      },
      {
        title: "Review Design System",
        description: "Study the company's design system and component library",
        category: "Learning",
        priority: "high",
        estimatedTime: 90,
      },
      {
        title: "Portfolio Review Session",
        description: "Share your work and get feedback from the design team",
        category: "Meetings",
        priority: "medium",
        estimatedTime: 60,
      },
    ],
  };

  private levelTasks: Record<string, Omit<ChecklistItem, 'id' | 'completed'>[]> = {
    junior: [
      {
        title: "Find a Buddy",
        description: "Connect with a peer who can help you navigate the company",
        category: "Social",
        priority: "medium",
        estimatedTime: 30,
      },
      {
        title: "Join Learning Groups",
        description: "Participate in study groups or skill-building sessions",
        category: "Learning",
        priority: "medium",
        estimatedTime: 60,
      },
    ],
    mid: [
      {
        title: "Review Leadership Resources",
        description: "Explore opportunities for leadership development",
        category: "Learning",
        priority: "low",
        estimatedTime: 45,
      },
      {
        title: "Connect with Cross-functional Teams",
        description: "Build relationships outside your immediate team",
        category: "Social",
        priority: "medium",
        estimatedTime: 60,
      },
    ],
    senior: [
      {
        title: "Mentorship Opportunities",
        description: "Explore ways to mentor junior team members",
        category: "Mentorship",
        priority: "medium",
        estimatedTime: 45,
      },
      {
        title: "Strategic Planning Session",
        description: "Contribute to team or department strategic planning",
        category: "Planning",
        priority: "medium",
        estimatedTime: 90,
      },
    ],
  };

  generateChecklist(user: User): OnboardingChecklist {
    const allTasks: Omit<ChecklistItem, 'id' | 'completed'>[] = [
      ...this.commonTasks,
      ...(this.roleTasks[user.role] || []),
      ...(this.departmentTasks[user.department] || []),
      ...(this.levelTasks[user.level] || []),
    ];

    const items: ChecklistItem[] = allTasks.map((task, index) => ({
      ...task,
      id: `${user.id}_task_${index}`,
      completed: false,
    }));

    return {
      id: `checklist_${user.id}`,
      userId: user.id,
      items,
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
