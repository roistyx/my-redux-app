import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import searchStocks from "../api/searchStocks.js";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../components/TextArea.js";

import "./ArticleEditor.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ArticleEditor({ handleExtract }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [articleContent, setArticleContent] = useState("");
  //   const { news } = useSelector((state) => state.news);
  console.log(articleContent);

  const handleOpen = async () => {
    const news = await handleExtract();
    const response = await searchStocks.extractNews(news.url);
    setArticleContent(response);
    console.log(response);

    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Extract</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <span id="modal-modal-title" variant="h6" component="h2">
            Edit Article
          </span>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextArea
              defaultValue={articleContent}
              maxRows={4}
              ariaLabel="maximum height"
              placeholder="Maximum 4 rows"
            />
          </Typography>
          <Button>Summarize</Button>
        </Box>
      </Modal>
    </div>
  );
}
