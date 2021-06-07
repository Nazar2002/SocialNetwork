import { create } from "react-test-renderer"
import ProfileStatus from './ProfileItem/ProfileStatus'


describe("Test 1", () => {
    test("", () => {
      const component = create(<ProfileStatus status="Hi" />)
      const instance = component.getInstance()
      expect(instance.state.status).toBe("Hi")
    })
  })