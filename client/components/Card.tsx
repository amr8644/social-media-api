import {
   Card,
   Grid,
   Text,
   Container,
   Spacer,
   Button,
   Avatar,
} from "@nextui-org/react";
import React from "react";
import ViewPost from "./ViewPost";
import Link from "next/link";
import { API_URL } from "../pages/api/url";

export default function PostCard({ posts }: any) {
   let read = false;

   const truncateString = (str: any, num: any) => {
      if (str?.length > num) {
         let subStr = str.substring(0, num);
         read = true;
         return subStr;
      } else {
         return str;
      }
   };

   return (
      <>
         {posts?.map((value: any) => {
            const { fullname, username, image } = value;
            return (
               <>
                  {value?.Posts.map((e: any) => {
                     const { ID, content, userid, like } = e;

                     return (
                        <>
                           <Spacer y={2} />
                           <Container
                              display="flex"
                              alignItems="center"
                              justify="center"
                              xl={true}
                           >
                              <Card key={ID} css={{ p: "$6", mw: "400px" }}>
                                 <Card.Header>
                                    <Avatar
                                       size={"lg"}
                                       color="gradient"
                                       rounded
                                       alt="nextui logo"
                                       src={`${API_URL}/${image}`}
                                       width={34}
                                       height={34}
                                    />

                                    <Grid.Container css={{ pl: "$6" }}>
                                       <Grid xs={12}>
                                          <Text h4 css={{ lineHeight: "$xs" }}>
                                             {fullname}
                                          </Text>
                                       </Grid>
                                       <Grid xs={12}>
                                          <Text css={{ color: "$accents8" }}>
                                             @{username}
                                          </Text>
                                       </Grid>
                                    </Grid.Container>
                                 </Card.Header>

                                 <Card.Body css={{ py: "$2" }}>
                                    <Text>{truncateString(content, 220)}</Text>
                                    {read ? <ViewPost /> : ""}
                                 </Card.Body>
                                 <Card.Footer>
                                    <Button
                                       size="sm"
                                       color={"primary"}
                                       auto
                                       ghost
                                       type="submit"
                                    >
                                       Like {1}
                                    </Button>
                                    <Spacer x={1} />

                                    <Button size="sm" bordered>
                                       <Link
                                          href="/user/[id]"
                                          as={`/user/${userid}`}
                                          color={"white"}
                                       >
                                          View Profile
                                       </Link>
                                    </Button>
                                 </Card.Footer>
                              </Card>
                           </Container>
                        </>
                     );
                  })}
               </>
            );
         })}
      </>
   );
}
