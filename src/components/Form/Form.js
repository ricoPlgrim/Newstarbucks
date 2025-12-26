import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import "./Form.scss";

function Form() {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    address: "", 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // 입력 필드 변경 핸들러
  const handleChange = (fieldName) => (e, value) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
    setMessage("");
    // 에러가 있으면 입력 시 에러 메시지 제거
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  // 유효성 검사 함수
  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "이름을 입력해주세요.";
    }
    if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(form.phone)) {
      nextErrors.phone = "휴대폰 번호를 010-1234-5678 형식으로 입력해주세요.";
    }
    if (!form.address.trim()) {
      nextErrors.address = "주소를 입력해주세요.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "유효한 이메일을 입력해주세요.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    return nextErrors;
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setMessage("유효성 검사가 완료되었습니다!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        label="이름"
        type="text"
        placeholder="홍길동"
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
        help={!errors.name ? "본인 확인이 가능한 이름을 입력하세요." : undefined}
        showClearButton
      />

      <Input
        label="휴대폰 번호"
        type="tel"
        placeholder="010-1234-5678"
        value={form.phone}
        onChange={handleChange("phone")}
        error={errors.phone}
        help={!errors.phone ? "숫자만 입력해도 자동으로 처리됩니다." : undefined}
        showClearButton
      />

      <Input
        label="주소"
        type="text"
        placeholder="도로명 주소를 입력하세요"
        value={form.address}
        onChange={handleChange("address")}
        error={errors.address}
        help={!errors.address ? "배송 또는 연락 가능한 주소를 입력하세요." : undefined}
        showClearButton
      />

      <Input
        label="이메일"
        type="email"
        placeholder="name@example.com"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        help={!errors.email ? "가입 시 사용한 이메일을 입력하세요." : undefined}
        showClearButton
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="8자 이상 입력"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
        help={!errors.password ? "문자, 숫자 조합으로 8자 이상 입력하세요." : undefined}
      />

      <Button type="submit" variant="primary" size="medium">
        유효성 검사
      </Button>
      {message && (
        <Typography variant="body" size="small" color="accent" className="form__success">
          {message}
        </Typography>
      )}
    </form>
  );
}

export default Form;

