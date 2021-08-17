import { render } from "@testing-library/react";
import MessageForm from "./MessageForm";

describe("MessageForm snapshot tests", () => {
  it("snapshot test", () => {
    const component = render(<MessageForm onSubmit="onSubmitMessage" />);
    expect(component).toMatchSnapshot();
  });
});
