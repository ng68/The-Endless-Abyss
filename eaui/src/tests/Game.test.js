import { mount } from '@vue/test-utils';
import Game from '../components/Game.vue';

describe('Game', () => {
  test('cycle room chooses room that is not the current room or in recentRooms array', () => {
    const wrapper = mount(Game);

    const prevData = wrapper.data().game.recentRooms;
    const prevRoom = wrapper.data().game.roomID;

    wrapper.vm.cycleRoom();

    expect(wrapper.data().game.recentRooms).toContain(prevRoom);
    expect(prevData).not.toContain(wrapper.data().game.roomID);
  });
});
