/* eslint-disable react/prop-types */
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Badge } from "@/components/ui/badge";
import { ImFire } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const badgeColor =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";

export default function Item({ question }) {
  return (
    <Link to={"/forum/answer/" + question.id}>
      <Card className="my-3">
        <CardActionArea>
          <CardContent>
            <ListItem key={question.id} alignItems="flex-start" className="gap-4">
              <ListItemAvatar className="text-center">
                <Badge className="bg-[#6F0096] h-10 flexbox items-center mx-auto">
                  <TiTick size="1.5rem" /> 38 Answers
                </Badge>
                {/* <span className="text-sm text-gray-500">128 votes</span>
                <span className="flex">
                  <ImFire /> 1m views
                </span> */}
              </ListItemAvatar>
              <ListItemText
                className="gap-2"
                primary={question.title}
                primaryTypographyProps={{ variant: "h6" }}
                secondary={
                  <div className="my-3">
                    <div
                      className="question-description"
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />
                    <div className="flex gap-2 my-3">
                      {question.keywords &&
                        question.keywords.map((keyword, index) => (
                          <Badge
                            key={index} // Use index as key if keywords are not unique
                            variant="secondary"
                            className={badgeColor}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      <div className="flex ml-auto justify-center items-center gap-2">
                        <div className="flex ml-auto items-center gap-1">
                          <Avatar
                            alt="Remy Sharp"
                            src="src/assets/nav/sample-profile.png"
                          />
                          <div className="ml-auto items-center">
                            <span>
                              {question.authorName
                                ? `${question.authorName}`
                                : "Unknown"}
                            </span>
                            <p className="text-sm text-gray-500">
                              {question.updatedAt
                                ? `Modified at ${question.updatedAt}`
                                : `Asked at ${question.createdAt}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                secondaryTypographyProps={{ variant: "div" }}
              />
            </ListItem>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
