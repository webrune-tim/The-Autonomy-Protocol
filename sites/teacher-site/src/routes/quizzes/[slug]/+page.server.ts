import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { parseQuiz } from "$lib/quiz-parser";

const INTEGRITY_PROTOCOL_MD = `# Quiz: The Integrity Protocol (Principles of Communication)

1. In this system, "Integrity" is defined as:

- [ ] Doing exactly what everyone else expects of you
- [ ] Using your words and actions in a way that does not go against yourself
- [ ] Being the loudest person in a debate
- [ ] Never making a single mistake in schoolwork

<!--  B (Goal: Define Integrity as self-alignment) -->

2. Why is the "Word" considered a creative force?

- [ ] Because it can be used to manifest ideas, influence others, and build your reputation
- [ ] Because words are the only way to earn a high grade in English class
- [ ] Because it is a physical object you can hold
- [ ] Because it is a form of silent communication

<!-- A (Goal: Understand the power of influence) -->

3. When the mind is described as "fertile ground," what does this mean for our social interactions?

- [ ] You should only talk to people who agree with you
- [ ] Your mind is constantly growing new cells
- [ ] Ideas, opinions, and comments from others can easily take root and grow in your mind
- [ ] You need to spend more time outdoors to think clearly

<!-- C (Goal: Recognize susceptibility to social influence) -->

4. What is the primary danger of "Gossip" or "Emotional Poison"?

- [ ] It takes too long to type into a phone
- [ ] It functions like a computer virus, clogging communication and creating confusion
- [ ] It makes you more popular with your peers
- [ ] It is only harmful if the person hears what you said

<!-- B (Goal: Understand the systemic impact of gossip) -->

5. How is a "Personal Spell" created?

- [ ] By practicing magic tricks in front of an audience
- [ ] By believing a false opinion or a negative label given to you by someone else
- [ ] By reading books about fantasy and mythology
- [ ] By choosing to ignore your homework assignments

<!-- B (Goal: Identify how limiting beliefs are formed) -->

6. What is considered the most harmful act an individual can commit against themselves?

- [ ] Forgetting to study for a quiz
- [ ] Self-rejection (judging or devaluing yourself)
- [ ] Losing a sports competition
- [ ] Changing your mind about a hobby

<!-- B (Goal: Prioritize self-acceptance) -->

7. If you use your words to attack or belittle someone else, why is it ultimately "going against yourself"?

- [ ] Because you will run out of things to say
- [ ] Because it creates a cycle of hostility that will eventually be directed back at you
- [ ] Because your vocal cords will get tired
- [ ] Because you will be forced to apologize immediately

<!-- B (Goal: Understand the "boomerang effect" of negativity) -->

8. What is the most effective way to break a "negative cycle" of communication?

- [ ] Waiting for the other person to change first
- [ ] Adopting a new standard of truth and personal accountability
- [ ] Refusing to speak to anyone for a week
- [ ] Arguing until you prove you are right

<!-- B (Goal: Empower students to take the first step in change) -->

9. How does practicing communication integrity provide "immunity" from the opinions of others?

- [ ] It makes your mind "infertile ground" for negative or false labels
- [ ] It makes you physically stronger than other people
- [ ] It guarantees that no one will ever say anything mean to you
- [ ] It helps you forget what other people have said

<!-- A (Goal: Build resilience against peer pressure) -->

10. What is the ultimate goal of following this communication protocol?

- [ ] To win every argument you have
- [ ] To transform your daily experience from one of fear and conflict to one of confidence and peace
- [ ] To become a professional public speaker
- [ ] To ensure you never have to work in a group again

<!-- B (Goal: Define the long-term benefit of the practice) -->

11. In you own words, describe what Integraty is and why it is important for you life.

>
>
>
`;

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  if (slug === "integrity-protocol") {
    const quiz = parseQuiz(INTEGRITY_PROTOCOL_MD);
    return {
      quiz,
    };
  }

  // If no quiz is found, we "fail-safe"
  throw error(404, { message: "Curriculum module not found in the repository." });
};
