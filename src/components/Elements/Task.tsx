import { Link } from 'react-router-dom';
import { memo, useCallback, useEffect, useState } from 'react';
import { MemorizedConfirmPopup } from '../Modals/ConfirmPopup';
import { TaskProps, ErrorHandler } from '../../utility';
import { useCommonContext, useTaskContext } from '../../hooks';
import { useTranslation } from 'react-i18next';
import LoadingSkeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Task = ({ task }: TaskProps) => {
  // i18n translation
  const { t } = useTranslation();

  // contexts
  const { deleteTask } = useTaskContext();
  const { updatePopupStatus, setEditableTask, darkMode, setShowSpinner } =
    useCommonContext();

  // states
  const { title, description, id, createdAt } = task;
  const [deleteConfirmPopup, showDeleteConfirmPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Below is demonstration of UseCallBack which memorizes function
  const handleDelete = useCallback(() => {
    try {
      setShowSpinner(true);
      deleteTask(id);
      showDeleteConfirmPopup(false);
      setTimeout(() => {
        setShowSpinner(false);
      }, 1000);
    } catch (error: any) {
      ErrorHandler(error);
      setShowSpinner(false);
    }
  }, []); // eslint-disable-line

  const handleEdit = () => {
    updatePopupStatus(true);
    setEditableTask(task);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 h-70 overflow-auto'>
      {loading || !task ? (
        <div data-testid='loading-skeleton-display'>
          <SkeletonTheme
            baseColor={darkMode ? '#202020' : ''}
            highlightColor={darkMode ? '#444' : ''}
          >
            <LoadingSkeleton
              height={40}
              className='my-2 p-2 dark:bg-gray-800'
            />
            <LoadingSkeleton
              height={220}
              className='my-2 p-2 dark:bg-gray-800'
            />
            <LoadingSkeleton
              height={60}
              className='my-2 p-2 dark:bg-gray-800'
            />
          </SkeletonTheme>
        </div>
      ) : (
        <>
          <div className='p-5'>
            <Link to={`/dashboard/task/${id}`}>
              <h5
                className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center'
                data-testid='title'
              >
                {title}
              </h5>
            </Link>
            <Link to={`/dashboard/task/${id}`}>
              <p
                className='mb-1 font-normal text-gray-700 dark:text-slate-50 mt-5'
                data-testid='description'
              >
                {description.length > 200
                  ? `${description.substring(0, 200)}`
                  : description}
                {description.length > 200 && (
                  <span className='text-blue-400 cursor-pointer underline'>
                    {t('taskReadMoreLabel')}
                  </span>
                )}
              </p>
            </Link>
          </div>
          <div>
            <span
              className='flex justify-end pr-2 underline mt-2 mb-4 cursor-pointer text-green-700 dark:text-green-300'
              data-testid='createdAt'
            >
              {new Date(createdAt).toLocaleString()}
            </span>
          </div>
          <div className='flex justify-between px-2 pb-1 mx-4 my-4'>
            <i
              className='bi bi-trash-fill text-xl text-red-900 cursor-pointer dark:text-white'
              title='Delete'
              data-testid='delete-button'
              onClick={() => showDeleteConfirmPopup(true)}
            ></i>
            <i
              className='bi bi-pencil-fill text-xl cursor-pointer dark:text-white'
              title='Edit'
              data-testid='edit-button'
              onClick={handleEdit}
            ></i>
          </div>
        </>
      )}
      <MemorizedConfirmPopup
        confirmPopup={deleteConfirmPopup}
        showConfirmPopup={showDeleteConfirmPopup}
        handleOperation={handleDelete}
        popupText={t('deleteConfirmPopupLabel')}
      />
    </div>
  );
};

export const MemorizedTask = memo(Task); // This is demonstration of using Memorized functions whenever possible to improve the performance
export default Task;
