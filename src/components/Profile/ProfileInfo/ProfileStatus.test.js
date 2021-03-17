import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Hello"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Hello")
    })

    test("element span should be present", () => {
        const component = create(<ProfileStatus status="Hello"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull;
    })

    test("element input should not be present", () => {
        const component = create(<ProfileStatus status="Hello"/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType("input");
        }).toThrow();
    })

    test("element span should have a text", () => {
        const component = create(<ProfileStatus status="Hello"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("Hello");
    })

    test("Input should be displayed instead of span", () => {
        const component = create(<ProfileStatus status="Hello"/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input")
        expect(input.props.value).toBe("Hello");
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})