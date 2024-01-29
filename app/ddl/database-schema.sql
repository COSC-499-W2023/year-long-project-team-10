CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE member (
  "memberID" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" TEXT UNIQUE NOT NULL,
  "username" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "isOrg" BOOLEAN DEFAULT FALSE
);



CREATE TABLE profile (
    "memberID" UUID PRIMARY KEY,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bio" TEXT,
    "pfpPath" TEXT, 
    FOREIGN KEY ("memberID") REFERENCES member("memberID")
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE security_question (
  "id" UUID PRIMARY KEY,
  "memberID" UUID NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  FOREIGN KEY ("memberID") REFERENCES member("memberID")
  	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tag(
  "tagID" SERIAL PRIMARY KEY,
  "tagName" TEXT NOT NULL UNIQUE
);

CREATE TABLE user_tag(
  "memberID" UUID,
  "tagID" INT,
  PRIMARY KEY ("tagID", "memberID"),
  FOREIGN KEY ("memberID") REFERENCES member("memberID")
  	ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("tagID") REFERENCES tag("tagID")
  	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE profile_picture (
    "memberID" uuid,
    image bytea,
    foreign key ("memberID") references member("memberID")
    	on delete cascade on update cascade
);

CREATE TABLE chat(
  "chatID" SERIAL PRIMARY KEY,
  "memberID1" uuid NOT NULL,
  "memberID2" uuid NOT NULL,
  FOREIGN KEY ("memberID1") REFERENCES member("memberID")
    ON DELETE CASCADE ON UPDATE CASCADE,    
  FOREIGN KEY ("memberID2") REFERENCES member("memberID")
  	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE message(
  "messageID" SERIAL PRIMARY KEY,
  "chatID" int NOT NULL,
  "senderID" uuid NOT NULL,
  "message" TEXT NOT NULL,
  FOREIGN KEY ("chatID") REFERENCES chat("chatID")
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("senderID") REFERENCES member("memberID")
    ON DELETE CASCADE ON UPDATE CASCADE
);

