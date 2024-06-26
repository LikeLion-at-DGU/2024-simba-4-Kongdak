document.addEventListener("DOMContentLoaded", function () {
  const tagInput = document.querySelector("#tag-zone");
  const titleInput = document.querySelector("input[name='title']");
  const contentInput = document.querySelector("textarea[name='content']");
  const saveButton = document.querySelector("#diary_save");

  // 제목과 내용 검증 정규 표현식
  const titleRegex = /^[\s\S]{1,8}$/;
  const contentRegex = /^[\s\S]{1,}$/;
  const tagRegex = /^#.+/;

  // 한글 입력 상태 확인 변수
  let isComposing = false;

  tagInput.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  tagInput.addEventListener("compositionend", () => {
    isComposing = false;
  });

  // 모든 입력 필드에서 엔터키를 눌렀을 때 폼 제출을 막음
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
  });

  tagInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !isComposing) {
      event.preventDefault();
      const tagValue = tagInput.value.trim();
      if (tagValue && !tagValue.endsWith("#")) {
        const tags = tagInput.value.trim().split(" ");
        let lastTag = tags.pop();

        if (!lastTag.startsWith("#")) {
          lastTag = `#${lastTag}`;
        }

        if (!tags.includes(lastTag) && lastTag !== "#") {
          tags.push(lastTag);
        }

        tagInput.value = tags.join(" ") + " ";
      }
      validateInputs();
    }
  });

  // 입력 필드 변경 시 유효성 검증 및 저장 버튼 활성화
  function validateInputs() {
    const isTitleValid = titleRegex.test(titleInput.value);
    const isContentValid = contentRegex.test(contentInput.value);
    const isTagValid = tagRegex.test(tagInput.value.trim());

    if (isTitleValid && isContentValid && isTagValid) {
      saveButton.disabled = false;
      saveButton.classList.remove("disabled-btn");
      saveButton.classList.add("abled-btn");
    } else {
      saveButton.disabled = true;
      saveButton.classList.add("disabled-btn");
      saveButton.classList.remove("abled-btn");
    }
  }

  titleInput.addEventListener("input", validateInputs);
  contentInput.addEventListener("input", validateInputs);
  tagInput.addEventListener("input", validateInputs);
});
