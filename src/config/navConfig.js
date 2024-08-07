// navConfig.js
export const navConfig = {
  USER: [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Discussion Forum", path: "/forum" },
  ],
  ELIGIBLE: [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Discussion Forum", path: "/forum" },
    { name: "Recovery Checklist", path: "/eligible/1" },
  ],
  PARENT: [
    { name: "Home", path: "/" },
    { name: "Child Growth", path: "/growth" },
    { name: "Pregnancy Card", path: "/pregnancy/1" },
    { name: "Memories", path: "/memories" },
    {
      name: "More",
      links: [
        { name: "Blogs", path: "/blogs" },
        { name: "Discussion Forum", path: "/forum" },
        { name: "Recovery Checklist", path: "/eligible/1" },
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
      ],
    },
    { name: "Chat", path: "/chat" },
    { name: "Analytics", path: "/analytics" },
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
      ],
    },
    { name: "System Analytics", path: "/analytics" },
    {
      name: "More",
      links: [
        { name: "Blogs", path: "/blogs" },
        { name: "Discussion Forum", path: "/forum" },
      ],
    },
  ],
};
