export function Form(props) {
  const { children, onSubmit, ...other } = props;
  return <form {...other}>{children}</form>;
}
