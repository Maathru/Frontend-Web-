// navConfig.js
export const navConfig = {
  GUEST: [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Discussion Forum", path: "/forum" },
  ],
  USER: [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Discussion Forum", path: "/forum" },
    { name: "Chat", path: "/chat" },
  ],
  ELIGIBLE: [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Discussion Forum", path: "/forum" },
    { name: "Recovery Checklist", path: "/eligible" },
    { name: "Chat", path: "/chat" },
  ],
  PARENT: [
    { name: "Home", path: "/" },
    { name: "Child Growth", path: "/growth" },
    { name: "Pregnancy Card", path: "/pregnancy" },
    { name: "Memories", path: "/memories" },
    {
      name: "More",
      links: [
        { name: "Blogs", path: "/blogs" },
        { name: "Discussion Forum", path: "/forum" },
        { name: "Recovery Checklist", path: "/eligible" },
        { name: "Chat", path: "/chat" },
      ],
    },
  ],
  MIDWIFE: [
    { name: "Home", path: "/" },
    {
      name: "Services",
      links: [
        { name: "Manage Eligible Couples", path: "/eligibles" },
        { name: "Manage Parents", path: "/parents" },
        { name: "Clinics", path: "/clinics" },
      ],
    },
    { name: "Chat", path: "/chat" },
    { name: "Analytics", path: "/statistics" },
    {
      name: "More",
      links: [
        { name: "Blogs", path: "/blogs" },
        { name: "Discussion Forum", path: "/forum" },
      ],
    },
  ],
  DOCTOR: [
    { name: "Home", path: "/" },
    { name: "Clinics", path: "/clinics" },
    { name: "Midwife", path: "/midwife" },
    { name: "Statistics", path: "/statistics" },
    {
      name: "More",
      links: [
        { name: "Blogs", path: "/blogs" },
        { name: "Discussion Forum", path: "/forum" },
        { name: "Drugs", path: "/drugs" },
        { name: "Chat", path: "/chat" },
      ],
    },
  ],
  ADMIN: [
    { name: "Home", path: "/" },
    {
      name: "Services",
      links: [
        { name: "Manage Blogs", path: "/manage/blogs" },
        { name: "Manage Users", path: "/users" },
        { name: "Clinic Schedules", path: "/clinics" },
        { name: "Health Statistics", path: "/statistics" },
        { name: "Manage Regions", path: "/regions" },
        { name: "Manage Drugs", path: "/drugs" },
      ],
    },
    { name: "Health Analytics", path: "/analytics" },
    {
      name: "More",
      links: [
        { name: "logs", path: "/logs" },
        { name: "Blogs", path: "/blogs" },
        { name: "Discussion Forum", path: "/forum" },
        { name: "Chat", path: "/chat" },
      ],
    },
  ],
};
