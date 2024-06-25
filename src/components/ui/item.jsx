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
  ListSubheader 
} from '@mui/material';
import { Button } from "flowbite-react";
import { ImFire } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

export default function Item() {
  return (
    <>
      <Card className="my-3">
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
                    <Button className="bg-slate-400 h-10 flexbox items-center text-purple-800" > Parental Care</Button> 
                    <Button className="bg-slate-400 h-10 flexbox items-center text-purple-800" > Nutrition </Button>
                    <Button className="bg-slate-400 h-10 flexbox items-center text-purple-800" > Postpartum</Button>
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
      </Card>
    </>
  )
}

