import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z as zod } from 'zod';
import { tagsService } from '../services/tag.service';
import { Form } from './Form';

const NewTagSchema = zod.object({
  tag: zod.string().min(1, { message: 'Tag is required!' }),
});

interface ITagFormValues {
  tag: string;
}

interface ITagDialogContentProps {
  onClose: () => void;
  fileId: string | undefined;
}

const TagDialogContent: React.FC<ITagDialogContentProps> = ({
  onClose,
  fileId,
}) => {
  const defaultValues: ITagFormValues = useMemo(
    () => ({
      tag: '',
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(NewTagSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit((payload) => {
    try {
      if (fileId) {
        addTag({ text: payload.tag, fileId });
      }
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  const { mutate: addTag } = useMutation({
    mutationFn: ({ text, fileId }: { text: string; fileId: string }) => {
      const payload = {
        tag: {
          text,
        },
        fileId,
      };
      return tagsService.addNewTag(payload);
    },

    onSuccess: async () => {
      toast.success('Tag Has Been Added');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <h6 className="mb-4">Add Tag</h6>
      <Form methods={methods} onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            {...methods.register('tag')}
            placeholder="Tag"
            className="form-control"
          />
          {methods.formState.errors.tag?.message && (
            <label color="error">{methods.formState.errors.tag?.message}</label>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-gradient-info w-100 mt-3 mb-0"
          >
            Add
          </button>
        </div>
      </Form>
    </>
  );
};
export default TagDialogContent;
