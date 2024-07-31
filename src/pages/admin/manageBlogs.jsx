import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogImage from "../../assets/blog/blog-image.png";
import RecentBlogImage1 from "../../assets/blog/recent-blog-image-1.png";
import RecentBlogImage2 from "../../assets/blog/recent-blog-image-2.png";
import Heading from "@/components/ui/heading";
import Search from "@/components/Search";
import { t } from "i18next";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Box } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

const cardColor = "bg-light-blogcard dark:bg-dark-primary hover:dark:bg-dark-blogcard";
const badgeColor = "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";
const readMoreColor = "text-primary-purple dark:text-dark-primary font-semibold hover:text-primary-purple hover:dark:text-dark-primary";

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                m: 2,
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <GridToolbarQuickFilter
                sx={{
                    width: 400,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .MuiOutlinedInput-root:focus-within": {
                        outline: "none",
                        boxShadow: "none",
                    },
                }}
            />
        </Box>
    );
}

const BlogCard = ({ blog, handleAccept }) => {
    return (
        <div className="flex justify-between my-2">
            <Card className={`${cardColor} flex items-center`}>
                <img
                    src={blog.image}
                    alt="Blog Image"
                    className="rounded-md hidden md:block m-2 max-w-72 max-h-72 object-fit"
                />
                <div className="flex flex-col justify-between">
                    <CardHeader>
                        <img
                            src={blog.image}
                            alt="Blog Image"
                            className="rounded-md mb-2 md:hidden w-[100%] max-h-48 object-cover"
                        />
                        <CardTitle>{blog.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <p>{blog.description}</p>
                    </CardContent>
                    <CardFooter className="pb-0">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className={badgeColor}>
                                Newborn
                            </Badge>
                            <Badge variant="secondary" className={badgeColor}>
                                Vaccination
                            </Badge>
                            <Badge variant="secondary" className={badgeColor}>
                                Health
                            </Badge>
                        </div>
                        
                    </CardFooter>
                    <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-500">{blog.status}</span>
                            {blog.status === "Pending" && (
                                <Button onClick={() => handleAccept(blog.id)} className="ml-2">
                                    Accept
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Vaccination Guide for Newborns and Infants",
            status: "Pending",
            image: RecentBlogImage2,
            description: "Vaccinating newborns is crucial. Their developing immune systems leave them vulnerable to serious diseases. Vaccines safely train their bodies to fight these illnesses, protecting them from harm.",
        },
        {
            id: 2,
            title: "The Importance of Regular Exercise",
            status: "Approved",
            image: RecentBlogImage1,
            description: "Vaccinating newborns is crucial. Their developing immune systems leave them vulnerable to serious diseases. Vaccines safely train their bodies to fight these illnesses, protecting them from harm.",
        },
    ]);

    const handleAccept = (id) => {
        setBlogs(
            blogs.map((blog) =>
                blog.id === id ? { ...blog, status: "Approved" } : blog
            )
        );
    };

    return (
        <div className="content-container">
            <Heading title={"Manage Blogs"} />

            <Search placeholder={t("search")} />

            <div className="mt-12">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} handleAccept={handleAccept} />
                ))}
                <Pagination />
            </div>
        </div>
    );
};

export default ManageBlogs;
