function TaskItem({ title, complet, onToggle }) {
  return (
    <li
      onClick={onToggle}
      style={{ textDecoration: complet ? "line-throught" : "none" }}
    >
      {title}
    </li>
  );
}
export default TaskItem;
