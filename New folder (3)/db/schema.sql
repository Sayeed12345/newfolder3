CREATE TABLE "persons" (
	 "persons_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	 "fullname" TEXT(255,0) NOT NULL,
	 "email" TEXT(255,0) NOT NULL,
	 "contact" TEXT(255,0) NOT NULL,
);
CREATE INDEX "fullname_index" ON persons ("fullname" COLLATE NOCASE ASC);
CREATE INDEX "email_index" ON persons ("email" COLLATE NOCASE ASC);
CREATE INDEX "contact_index" ON persons ("contact" COLLATE NOCASE ASC);
INSERT INTO `people` VALUES (NULL, "", "", ""), (NULL, "", "", "");
