import * as React from 'react';
import { 
  ListItem, 
  Divider, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  Card, 
  CardContent, 
  ListSubheader ,
  CardActionArea
} from '@mui/material';
import { Badge } from "@/components/ui/badge";
import { Button } from "flowbite-react";
import { ImFire } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

const badgeColor = "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";

export default function Item() {
  return (
    <>
      <Card className="my-3">
      <CardActionArea>
        <CardContent>
        <ListItem alignItems="" className="gap-4">
            <ListItemAvatar className="text-center">
                <Button className="bg-[#6F0096] h-10 flexbox items-center mx-auto">
                <TiTick size="1.5rem"/> 38 Answers
                </Button>
                <span className="text-sm text-gray-500">128 votes</span>
                <span className="flex"><ImFire /> 1m views</span>
            </ListItemAvatar>
            <ListItemText
            className="gap-2"
            primary="Brunch this weekend?"
            primaryTypographyProps={{ variant: "h6" }}
            secondary={
                <div className="my-3">
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    Prenatal care is a critical component of a healthy pregnancy, providing essential medical support and guidance to expectant mothers. Regular check-ups and prenatal screenings....
                </Typography>
                <div className="flex gap-2 my-3">
                    <Badge variant="secondary" className={badgeColor}>
                      Prenatal Nutrition
                    </Badge>
                    <Badge variant="secondary" className={badgeColor}>
                      Meal Plan
                    </Badge>
                    <Badge variant="secondary" className={badgeColor}>
                      Dietary Tips
                    </Badge>
                    <div className="flex ml-auto justify-center items-center gap-2">
                      <Avatar alt="Remy Sharp" src="src\assets\nav\sample-profile.png" />
                      <Link>User Name</Link>
                      {" — 1 hour ago"}
                    </div>
                </div>
                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                </div>
            }
            // secondaryTypographyProps={{ variant: "p" }}
            />
            {/* <ListSubheader>Comment</ListSubheader> */}
        </ListItem>
        </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

