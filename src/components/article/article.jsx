import { Box, Typography} from "@mui/material";

const ArticleViewer = ({ article }) => {
  if (!article) return null;

  return (
    <Typography >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {article.title}
      </Typography>

      <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
        {article.description}
      </Typography>

      {article.parts?.map(([label, text], idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Part {label}
          </Typography>
          <Typography variant="body2" sx={{ color: "#333" }}>
            {text}
          </Typography>
        </Box>
      ))}

      {article.hint && (
        <Typography sx={{ mt: 2}}>
          <strong>Hint:</strong> {article.hint}
        </Typography>
      )}
    </Typography>
  );
};

export default ArticleViewer;
