import React from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  //3- useForm ile tanımla
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
    mode: "onChange",
  });

  const onFormSubmit = (formData, e) => {
    e.target.reset();
    console.log(formData);
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    toast.info("Görev atandı.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {errors.title && <div> {errors.title.message} </div>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı.",
            },
          })}
        ></textarea>
        {errors.description && <div> {errors.description.message} </div>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: {
                    moreThanOne: (p) =>
                      p.length >= 1 || "Lütfen en az bir kişi seçin",
                    maxThree: (p) =>
                      p.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <div> {errors.people.message} </div>}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
