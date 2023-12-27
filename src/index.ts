import express, { Request, Response, NextFunction } from 'express';
import router  from '../routes/task'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tasks', router)
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Type and Express Server");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack?.substring);
    res.status(500).send('Something went wrong');
  });

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
})