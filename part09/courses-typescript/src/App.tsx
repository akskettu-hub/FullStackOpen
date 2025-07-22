interface HeaderProps {
  courseNme: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseNme}</h1>;
};

type Course = {
  name: string;
  exerciseCount: number;
};

interface ContentProps {
  courseParts: Course[];
}

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((course) => (
        <p>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseNme={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
