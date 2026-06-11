export const EchoArea = ({ message }: { message: string }) => (
  <div className="emacs-echo-area" title="echo area / minibuffer">
    <span key={message} className="echo-message">
      {message}
    </span>
  </div>
);
