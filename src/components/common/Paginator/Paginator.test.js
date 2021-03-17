import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component tests", () => {
    test("pages count is 11, but should be displayed only 10", () => {
        const component = create(<Paginator totalItemsCount="11" pageCount="1" portionSize="10"/>);
        const root = component.root;
        const span = root.findAllByType("span");
        expect(span.length).toBe(10);
    })

    test("If pages is more than 10, button NEXT should be displayed", () => {
        const component = create(<Paginator totalItemsCount="11" pageCount="1" portionSize="10"/>);
        const root = component.root;
        const span = root.findAllByType("button");
        expect(span.length).toBe(1);
    })
})